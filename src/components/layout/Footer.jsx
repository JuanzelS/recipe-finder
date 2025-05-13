import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-8 text-center text-gray-500">
      <div className="container mx-auto px-4 max-w-6xl">
        <p className="mb-2">
          &copy; {currentYear} Recipe Finder App | 
          Built with React and Redux
        </p>
        <p>
          Data provided by <a 
            href="https://www.themealdb.com/api.php" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-dark"
          >
            TheMealDB API
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;