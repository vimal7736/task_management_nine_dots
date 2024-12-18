import React, { useState, useEffect } from 'react';

const GradientPulseSvg = () => {
  const [gradientColor, setGradientColor] = useState('#6b21a8'); // Initial color (purple)

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientColor((prevColor) =>
        prevColor === '#6b21a8' ? '#6b6b6b' : '#6b21a8' // Toggle between purple and gray
      );
    }, 1000); // Change color every 1 second for faster animation

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-16 w-16 mr-2 transform transition-transform duration-500 ease-in-out hover:scale-110"
    >
      <defs>
        <linearGradient id="purpleGrayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: gradientColor, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#6b6b6b', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm2-12h-4v4H8l5 5 5-5h-3z"
        fill="url(#purpleGrayGradient)"
      />
    </svg>
  );
};

export default GradientPulseSvg;
