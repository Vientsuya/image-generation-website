import Input from "../input";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Sprawdzenie formu bez backendu xp
        if (email === 'test@exm.pl' && password === 'password') {
            console.log('Login successful with hardcoded credentials');
            navigate('/');
            return;
        }

        try {
            // Post do serwera
            const response = await axios.post('', {
                email,
                password,
            });

            if (response.data.success) {
                // sukceesik
                console.log('Login successful:', response.data);
                navigate('/');
            } else {
                // error
                setError(response.data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Wystąpił błąd podczas logowania');
        }
    };

    return (
        <>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Zaloguj się</h2>
            <p className="text-sm text-gray-600 mb-6">
                Lub <a href="/register" className="text-blue-600 hover:underline">stwórz konto</a>
            </p>
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
                    autoComplete="current-password"
                    required
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        ZALOGUJ
                    </button>
                </div>
            </form>
            <div className="text-sm mt-6">
                <a href="/register" className="font-medium text-blue-600 hover:underline">
                    Rejestracja
                </a>
            </div>
            <div className="text-sm mt-6">
                <a href="/forgot-password" className="font-medium text-blue-600 hover:underline">
                    Zapomniałeś hasła?
                </a>
            </div>
        </>
    );
}
