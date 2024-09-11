import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ImgSection() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get_all_images');
                console.log('Images:', response.data.images);
                const currentTime = new Date();
                const filteredImages = response.data.images.filter(image => {
                    const createdAt = new Date(image.created_at);
                    const timeDifference = currentTime - createdAt;
                    const hoursDifference = timeDifference / (1000 * 60 * 60);
                    return hoursDifference <= 3.0166667; // 2 hours and 1 minute in hours
                });
                setImages(filteredImages);
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
                        src={image.image_url}
                        alt='Wygenerowane zdjęcie'
                        className="object-cover w-full h-full"
                    />
                </div>
            ))}
        </div>
    );
}
