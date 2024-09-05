from flask import Flask, request, jsonify
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError
from openai import OpenAI
from decimal import Decimal, InvalidOperation
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost:3390/image_generation'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# User-Image association table
user_images = db.Table('user_images',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('image_id', db.Integer, db.ForeignKey('generated_image.id'), primary_key=True)
)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    wallet = db.Column(db.Numeric(10, 2), nullable=False, default=10.00)
    images = db.relationship('GeneratedImage', secondary=user_images, back_populates='owners')

# GeneratedImage model
class GeneratedImage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    prompt = db.Column(db.String(512), nullable=False)
    image_url = db.Column(db.String(768), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    owners = db.relationship('User', secondary=user_images, back_populates='images')

@app.route('/create_user', methods=['POST'])
def create_user():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    initial_balance = data.get('initial_balance', 10.00)
    
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    try:
        initial_balance = Decimal(initial_balance)
    except InvalidOperation:
        return jsonify({"error": "Invalid initial balance"}), 400
    
    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password, wallet=initial_balance)
    
    try:
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Username already exists"}), 400
    
    return jsonify({"message": "User created successfully", "initial_balance": float(initial_balance)}), 201

@app.route('/verify_credentials', methods=['POST'])
def verify_credentials():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    user = User.query.filter_by(username=username).first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    if check_password_hash(user.password, password):
        return jsonify({
            "message": "Credentials verified successfully",
            "username": user.username,
            "wallet_balance": float(user.wallet)
        }), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

@app.route('/get_balance', methods=['POST'])
def get_balance():
    data = request.json
    username = data.get('username')
    
    if not username:
        return jsonify({"error": "Username is required"}), 400
    
    user = User.query.filter_by(username=username).first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify({"username": user.username, "balance": float(user.wallet)}), 200

@app.route('/update_balance', methods=['POST'])
def update_balance():
    data = request.json
    username = data.get('username')
    amount = data.get('amount')
    
    if not username or amount is None:
        return jsonify({"error": "Username and amount are required"}), 400
    
    try:
        amount = Decimal(amount)
    except InvalidOperation:
        return jsonify({"error": "Invalid amount"}), 400
    
    user = User.query.filter_by(username=username).first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    user.wallet += amount
    db.session.commit()
    
    return jsonify({
        "message": "Balance updated successfully",
        "new_balance": float(user.wallet)
    }), 200

@app.route('/generate_image', methods=['POST'])
def generate_image():
    data = request.json
    username = data.get('username')
    prompt = data.get('prompt')
    
    if not username or not prompt:
        return jsonify({"error": "Username and prompt are required"}), 400
    
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    new_image = GeneratedImage(prompt=prompt)

    client = OpenAI()

    response = client.images.generate(
    model="dall-e-2",
    prompt=prompt,
    size="1024x1024",
    quality="standard",
    n=1,
    )

    image_url = response.data[0].url

    new_image.image_url = image_url
    new_image.prompt = prompt
    
    new_image.owners.append(user)
    
    db.session.add(new_image)
    db.session.commit()
    
    return jsonify({
        "message": "Image generated and associated with user",
        "image_id": new_image.id,
        "url": image_url
    }), 201

@app.route('/get_user_images', methods=['GET'])
def get_user_images():
    username = request.args.get('username')
    
    if not username:
        return jsonify({"error": "Username is required"}), 400
    
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    images = [{"id": img.id, "prompt": img.prompt, "image_url": img.url ,"created_at": img.created_at.isoformat()} 
              for img in user.images]
    
    return jsonify({
        "username": user.username,
        "images": images
    }), 200

@app.route('/get_all_images', methods=['GET'])
def get_all_images():
    # Optional pagination parameters
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    # Query all images with pagination
    pagination = GeneratedImage.query.order_by(GeneratedImage.created_at.desc()).paginate(
        page=page, per_page=per_page, error_out=False)
    
    images = []
    for img in pagination.items:
        images.append({
            "id": img.id,
            "image_url": img.image_url,
            "prompt": img.prompt,
            "created_at": img.created_at.isoformat(),
            "owners": [owner.username for owner in img.owners]
        })
    
    return jsonify({
        "images": images,
        "total_images": pagination.total,
        "pages": pagination.pages,
        "current_page": page
    }), 200


if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables
    app.run(debug=True)