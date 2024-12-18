import React from 'react';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-black to-black text-white flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
          TaskManager
        </h1>
        <p className="mt-4 text-lg font-semibold max-w-lg mx-auto">
          Organize, track, and achieve your goals effortlessly. Stay productive and on top of your tasks!
        </p>
        
        <div className="mt-8 flex justify-center gap-6">
          <Link to="/tasks" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 py-3 px-6 rounded-md text-lg font-semibold transition duration-300 transform hover:scale-105">
            Add task
          </Link>
         
        </div>
      </div>

      <div className="mt-12">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 text-white mx-auto animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
        </svg>
      </div>
    </div>
  );
};

export default HomeScreen;
