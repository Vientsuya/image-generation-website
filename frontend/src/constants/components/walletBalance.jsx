import { useState, useEffect } from 'react';
import axios from 'axios';

export default function WalletBalance() {
    const [balance, setBalance] = useState('0.00$');
    const [loading, setLoading] = useState(true);
    const username = localStorage.getItem('username');
    
    useEffect(() => {
        const fetchBalanceAndImages = async () => {
            try {
                // Fetch balance
                const balanceResponse = await axios.post('http://localhost:5000/get_balance', {
                    username,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                let fetchedBalance = balanceResponse.data.balance;

                // Fetch images
                const imagesResponse = await axios.get('http://localhost:5000/get_all_images');
                const currentTime = new Date();
                const displayedImages = imagesResponse.data.images.filter(image => {
                    const createdAt = new Date(image.created_at);
                    const timeDifference = currentTime - createdAt;
                    const hoursDifference = timeDifference / (1000 * 60 * 60);
                    return hoursDifference <= 3.0166667; // 2 hours and 1 minute in hours
                });

                // Calculate new balance
                const deduction = displayedImages.length * 0.5;
                const newBalance = Math.max(fetchedBalance - deduction, 0).toFixed(2);

                setBalance(`${newBalance}$`);
            } catch (error) {
                console.error("Error fetching data:", error);
                setBalance('0.00$');
            } finally {
                setLoading(false);
            }
        };

        fetchBalanceAndImages();
    }, [username]);

    if (loading) {
        return <h3 className="mr-2">-,--$</h3>;
    }

    return <h3 className="mr-2">{balance}</h3>;
}