import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-800 via-gray-600 to-black text-white py-6 relative overflow-hidden">
      <svg
        className="absolute bottom-0 left-0 w-full h-72 text-purple-600 opacity-20 animate-bounce-circles"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <circle cx="150" cy="250" r="60" fill="currentColor">
          <animate
            attributeName="cy"
            values="250;150;250"
            dur="2s"
            keyTimes="0;0.5;1"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="700" cy="250" r="60" fill="currentColor">
          <animate
            attributeName="cy"
            values="250;150;250"
            dur="2s"
            keyTimes="0;0.5;1"
            repeatCount="indefinite"
            begin="0.5s"
          />
        </circle>
        <circle cx="1200" cy="250" r="60" fill="currentColor">
          <animate
            attributeName="cy"
            values="250;150;250"
            dur="2s"
            keyTimes="0;0.5;1"
            repeatCount="indefinite"
            begin="1s"
          />
        </circle>
      </svg>

      <div className="max-w-screen-xl mx-auto text-center z-10 relative">
        <h2 className="text-3xl font-bold mb-2">TaskManager</h2>
        <p className="text-lg">Organize, Track, Achieve</p>
      </div>

      <style jsx>{`
        @keyframes bounce-circles {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-30px);
          }
        }

        .animate-bounce-circles {
          animation: bounce-circles 2s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
