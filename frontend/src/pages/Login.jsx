import React from 'react';

export default function Login() {
    return (
        <main className="bg-center h-screen bg-[url('/loginbg.jpg')] flex min-h-screen flex-col md:flex-row">
            {/* Left Section */}
            <section className="min-h-screen flex-1 flex flex-col justify-between p-10 text-white bg-cover bg-center ">
                <div className="flex-grow flex flex-col justify-center text-center md:text-left">
                    <h2 className="text-6xl font-bold leading-tight mb-20 md:w-9/12">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </h2>
                    <p className="text-2xl">
                        LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.
                    </p>
                </div>
                <div className="flex justify-center md:justify-start">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg md:hidden">
                        LOGOWANIE
                    </button>
                </div>
                <p className="text-sm text-center mt-8">
                    APLIKACJA STWORZONA PRZEZ KACPRA BRYŁA I MARCINA DZIERWA JAKO PRACA LICENCJACKA
                </p>
            </section>

            {/* Right Section - Hidden on Mobile */}
            <section className="hidden md:flex min-h-screen flex-1 bg-white flex flex-col items-center justify-center p-10">
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Zaloguj się</h2>
                <p className="text-sm text-gray-600 mb-6">
                    Lub <a href="#" className="text-blue-600 hover:underline">stwórz konto</a>
                </p>
                <form className="space-y-6 w-full max-w-sm">
                    <div>
                        <label htmlFor="email-address" className="sr-only">E-mail</label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            placeholder="E-mail"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Hasło</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            placeholder="Hasło"
                        />
                    </div>

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
                    <a href="#" className="font-medium text-blue-600 hover:underline">
                        Rejestracja
                    </a>
                </div>
                <div className="text-sm mt-6">
                    <a href="#" className="font-medium text-blue-600 hover:underline">
                        Zapomniałeś hasła?
                    </a>
                </div>
            </section>
        </main>
    );
}
