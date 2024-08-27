import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <main className="bg-center h-screen bg-[url('/loginbg.jpg')] flex justify-center items-center">
            <section className="bg-white flex flex-col items-center justify-center p-10 rounded-xl max-w-md w-full">
                <h1 className="text-4xl font-bold mb-4">404 :(</h1>
                <p>Podana strona nie istnieje</p>
                <div>
                <Link to="/login">
                <button
                    className="w-full mt-3 p-3 bg-white text-blue font-semibold rounded-lg hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Wróć do logowania
                </button>
                </Link>
            </div>
            </section>
        </main>
    )
}