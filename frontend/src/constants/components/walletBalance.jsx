import { useState, useEffect } from 'react';
import axios from 'axios';

export default function WalletBalance() {
    const [balance, setBalance] = useState('0,00$');
    const [loading, setLoading] = useState(true);
    const username = localStorage.getItem('username');
    
    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.post('http://localhost:5000/get_balance', {
                    username,
                },
                {
                    headers: {
                        'Content-Type': 'application/json', // Ensure JSON content type
                    }
                }); // Zamień na swoje API endpoint
                const fetchedBalance = response.data.balance; // Sprawdź jakie dane zwraca Twoje API
                setBalance(`${fetchedBalance.toFixed(2)}$`);
            } catch (error) {
                console.error("Error fetching balance:", error);
                setBalance('0,00$');
            } finally {
                setLoading(false);
            }
        };

        fetchBalance();
    }, []);

    if (loading) {
        return <h3 className="mr-2">-,--$</h3>;
    }

    return <h3 className="mr-2">{balance}</h3>;
}
