import Input from "./input";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function InputSection() {
    const [error, setError] = useState('');
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const username = localStorage.getItem('username');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/generate_image', {
                prompt,
                username
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                setError(response.data.message || 'Prompt failed');
            } else {
                setError(response.data.message || 'Prompt failed');
            }
        } catch (error) {
            console.error('Error prompting:', error);
            setError('Wystąpił błąd podczas promptowania');
        } finally {
            setIsLoading(false);
        }
    };

    // Use useEffect to monitor changes in the error state
    useEffect(() => {
        if (error === 'Wygenerowano obraz') {
            // Reload the page when the error message is 'Wygenerowano obraz'
            window.location.reload();
        }
    }, [error]); // This effect runs whenever 'error' changes

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Input 
                    type="text" 
                    placeholder="Kot w czapce"  
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isLoading}
                />
                <Input 
                    type="submit" 
                    value={isLoading ? "Generowanie..." : "Wygeneruj"}
                    disabled={isLoading}
                />
                {isLoading && <p className="text-blue-500 text-sm">Serwer pracuje nad Twoim obrazem...</p>}
            </form>
        </>
    );
}
