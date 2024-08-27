import React, { useState } from 'react';
import Input from '../input';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Replace with your forgot password API endpoint
            const response = await axios.post('/api/forgot-password', { email });

            if (response.data.success) {
                setMessage('Link resetujący hasło został wysłany na podany adres e-mail.');
                setError(''); // Clear any previous errors
            } else {
                setError(response.data.message || 'Wystąpił błąd podczas wysyłania linku resetującego hasło.');
                setMessage(''); // Clear any previous messages
            }
        } catch (error) {
            console.error('Error sending reset link:', error);
            setError('Wystąpił błąd podczas wysyłania linku resetującego hasło.');
            setMessage(''); // Clear any previous messages
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

            {message && <p className="text-green-500 text-sm">{message}</p>}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Zresetuj hasło
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
