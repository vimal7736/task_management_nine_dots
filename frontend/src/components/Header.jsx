import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../slices/features/auth/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false);

    function toggle() {
        setOpen(!open);
    }

    return (
        <header>
            <nav className="bg-gradient-to-r from-black via-gray-200 to-teal-950 text-white shadow-md">
                <div className="max-w-screen-xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="text-3xl font-semibold text-black flex items-center hover:text-blue-300 transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8 mr-2">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm2-12h-4v4H8l5 5 5-5h-3z" />
                            </svg>
                            TaskManager
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

                        {/* Desktop Menu */}
                        <div className={`hidden lg:flex space-x-6 items-center ${open ? 'block' : 'hidden'}`}>
                            {userInfo ? (
                                <>
                                    <Link to="/profile" className="hover:text-gray-400 transition duration-300 transform hover:scale-110">Profile</Link>
                                    <Link to="/tasks" className="flex items-center hover:text-gray-400 transition duration-300 transform hover:scale-110">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6h6M9 12h6M9 18h6" />
                                        </svg>
                                        Tasks
                                    </Link>
                                    <button onClick={() => dispatch(logout())} className="hover:text-gray-400 transition duration-300 transform hover:scale-110">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="hover:text-gray-400 transition duration-300 transform hover:scale-110">Login</Link>
                                    <Link to="/register" className="hover:text-gray-400 transition duration-300 transform hover:scale-110">Register</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {open && (
                    <div className="lg:hidden space-y-4 p-4 bg-gray-800 transition-all duration-300">
                        {userInfo ? (
                            <div>
                                <Link to="/profile" className="block hover:text-gray-400 transition duration-300 transform hover:scale-110">Profile</Link>
                                <Link to="/tasks" className="block hover:text-gray-400 transition duration-300 transform hover:scale-110">Tasks</Link>
                                <button onClick={() => dispatch(logout())} className="block hover:text-gray-400 transition duration-300 transform hover:scale-110">Logout</button>
                            </div>
                        ) : (
                            <div>
                                <Link to="/login" className="block hover:text-gray-400 transition duration-300 transform hover:scale-110">Login</Link>
                                <Link to="/register" className="block hover:text-gray-400 transition duration-300 transform hover:scale-110">Register</Link>
                            </div>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
