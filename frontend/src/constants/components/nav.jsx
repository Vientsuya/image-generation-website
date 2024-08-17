import logo from '../../assets/logo.png';
import { useState } from 'react';

export default function Nav() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap justify-between items-center p-2 md:ml-8">
                <a href="/" className="flex items-center">
                    <img src={logo} className="h-14" alt="Logo" />
                </a>
                
                <div className="flex items-center md:mr-10">
                    <h3 className="mr-2">0,00$</h3>
                    <div className="">
                        <div className="flex items-center justify-center h-full">
                            <div className="relative inline-block text-left">
                                <div>
                                    <button 
                                    type="button" 
                                    className="justify-center w-full rounded-md 
                                    shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-600 focus:outline-none 
                                    focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" 
                                    id="options-menu" 
                                    aria-haspopup="true" 
                                    aria-expanded="true"
                                    onClick={() => {setIsOpen(!isOpen)}}>
                                        <img src={logo} className="h-14 cursor-pointer" alt="Avatar" />
                                    </button>
                                </div>
                                {isOpen && (
                                <div 
                                className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                                consolelog={isOpen ? 'true' : 'false'} 
                                role="menu" 
                                aria-orientation="vertical" 
                                aria-labelledby="options-menu">
                                    <div role="none">
                                        <a href="#" className="py-1 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                            Konto
                                        </a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                            Wyloguj
                                        </a>
                                    </div>
                                </div> 
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}