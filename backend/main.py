from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError
from decimal import Decimal, InvalidOperation

app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/image_generation'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    wallet = db.Column(db.Numeric(10, 2), nullable=False, default=10.00)

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
            "wallet_balance": float(user.wallet)
        }), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

@app.route('/get_balance', methods=['GET'])
def get_balance():
    username = request.args.get('username')
    
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

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables
    app.run(debug=True)