import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ImgSection() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                // Wezwanie API do pobrania obrazów
                // const response = await axios.get('/api/images');
                // setImages(response.data);

                // Ne mam narazie API więc zwracam puste obiekty
                setImages([]);
            } catch (error) {
                console.error('Error fetching images:', error);
                setImages([]); // Ustawiam puste obiekty w przypadku błędu
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    // Szkielet ładowania
    if (loading || images.length === 0) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="bg-gray-700 w-full h-56 rounded-md animate-pulse"></div>
                ))}
            </div>
        );
    }

    // Wyświetlanie obrazów
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {images.map((image, index) => (
                <div key={index} className="w-full h-56 rounded-md overflow-hidden">
                    <img
                        src={image.url} // image.url to ścieżka do obrazu
                        alt={image.alt || `Image ${index + 1}`}
                        className="object-cover w-full h-full"
                    />
                </div>
            ))}
        </div>
    );
}
