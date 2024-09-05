import { useState } from 'react';
import Input from '../input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
    
        try {
            const response = await axios.post(
                'http://localhost:5000/create_user', 
                {
                    username,
                    password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json', // Ensure JSON content type
                    }
                }
            );
    
            console.log('Registration successful:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Error registering:', error);
            setError(error.response?.data?.error || 'An error occurred during registration. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
            <Input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
            />
            <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
            />
            <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    REGISTER
                </button>
                <Link to="/login">
                    <button
                        className="w-full mt-3 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Back to login
                    </button>
                </Link>
            </div>
        </form>
    );
}