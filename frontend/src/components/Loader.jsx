import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-opacity-25 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
