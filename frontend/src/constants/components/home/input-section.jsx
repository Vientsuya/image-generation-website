import Input from "./input"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function InputSection() {
    const [error, setError] = useState('');
    const [prompt, setPrompt] = useState('');
    const username = localStorage.getItem('username');
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/generate_image', {
                prompt,
                username
            },
            {
                headers: {
                    'Content-Type': 'application/json', // Ensure JSON content type
                }
            });

            if (response.status === 200) {
                console.log('Login successful:', response.data);
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
        <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="text" placeholder="Kot w czapce"  
                value={prompt}  // Bind the input value to the prompt state
                onChange={(e) => setPrompt(e.target.value)}/>
        <Input type="submit" value="Wygeneruj" />
        </form>
    </>
    )
}