import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../slices/features/auth/authSlice';
import GradientSvg from './GradientSvg';

const Header = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false);

    function toggle() {
        setOpen(!open);
    }

    return (
        <header>
            <nav className="bg-gradient-to-r from-purple-800 via-purple-700 to-black text-white shadow-lg">
                <div className="max-w-screen-xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="text-3xl font-bold text-white flex items-center hover:text-purple-500 transition duration-300 ease-in-out">
                            <GradientSvg />
                            <span className="ml-2">TaskManager</span>
                        </Link>

                        <div className="lg:hidden">
                            <button onClick={toggle} className="text-white focus:outline-none transition duration-300 transform hover:scale-125">
                                {open ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <div className={`hidden lg:flex space-x-8 items-center`}>
                            {userInfo ? (
                                <>
                                    <Link to="/tasks" className="flex items-center text-lg hover:text-gray-400 transition duration-300 ease-in-out transform hover:scale-110">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6h6M9 12h6M9 18h6" />
                                        </svg>
                                        Tasks
                                    </Link>
                                    <button onClick={() => dispatch(logout())} className="text-lg hover:text-gray-400 transition duration-300 ease-in-out transform hover:scale-110">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-lg hover:text-gray-400 transition duration-300 ease-in-out transform hover:scale-110">
                                        Login
                                    </Link>
                                    <Link to="/register" className="text-lg hover:text-gray-400 transition duration-300 ease-in-out transform hover:scale-110">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {open && (
                    <div className="lg:hidden space-y-4 p-6 bg-gradient-to-r from-gray-400 via-purple-800 to-purple-900 text-center">
                        {userInfo ? (
                            <div className="flex justify-center gap-6">
                                <Link to="/tasks" className="text-lg hover:text-gray-400 transition duration-300 ease-in-out transform hover:scale-110">Tasks</Link>
                                <button onClick={() => dispatch(logout())} className="text-lg hover:text-gray-400 transition duration-300 ease-in-out transform hover:scale-110">Logout</button>
                            </div>
                        ) : (
                            <div className="flex justify-between gap-6">
                                <Link to="/login" className="text-lg hover:text-gray-400 transition duration-300 ease-in-out transform hover:scale-110">Login</Link>
                                <Link to="/register" className="text-lg hover:text-gray-400 transition duration-300 ease-in-out transform hover:scale-110">Register</Link>
                            </div>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
