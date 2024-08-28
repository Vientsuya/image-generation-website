import LoginForm from "../constants/components/login/loginForm";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <main className="bg-center h-screen bg-[url('/loginbg.jpg')] flex min-h-screen flex-col md:flex-row">
            {/* Left Section */}
            <section className="min-h-screen flex-1 flex flex-col justify-between p-10 text-white bg-cover bg-center ">
                <div className="flex-grow flex flex-col justify-center text-center md:text-left">
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-20 md:w-9/12">
                        Praca dyplomowa
                    </h2>
                    <p className="text-xl md:text-2xl">
                        Serwis ten stanowi integralną część pracy licencjackiej (kierunek: elektroniczne 
                        przetwarzanie informacji), przygotowanej pod kierunkiem dr Krzysztofa Pomorskiego na Wydziale Zarządzania i Komunikacji Społecznej 
                        Uniwersytetu Jagiellońskiego
                    </p>
                </div>
                <div className="flex justify-center md:justify-start">
                    <Link to="/login-mobile">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg md:hidden">
                            LOGOWANIE
                        </button>
                    </Link>
                </div>
                
            </section>

            {/* Right Section - Hidden on Mobile */}
            <section className="hidden md:flex min-h-screen flex-1 bg-white flex flex-col items-center justify-center p-10 rounded-xl">
                <LoginForm />
            </section>
        </main>
    );
}
