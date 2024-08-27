import { useState } from 'react';
import Input from '../input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError('Hasła nie są takie same');
            return;
        }

        try {
            // Replace with your registration API endpoint
            const response = await axios.post('/api/register', {
                email,
                password,
            });

            if (response.data.success) {
                console.log('Registration successful:', response.data);
                navigate('/login'); // Redirect to home or another page
            } else {
                setError(response.data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error registering:', error);
            setError('Wyjątek podczas rejestracji. Spróbuj ponownie.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
            <Input
                id="email-address"
                name="email"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
            />
            <Input
                id="password"
                name="password"
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
            />
            <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                placeholder="Potwierdź hasło"
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
                    ZAREJESTRUJ
                </button>
                <Link to="/login">
                <button
                    className="w-full mt-3 py-3 bg-white text-blue font-semibold rounded-lg hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Wróć do logowania
                </button>
                </Link>
            </div>
        </form>
    );
}
