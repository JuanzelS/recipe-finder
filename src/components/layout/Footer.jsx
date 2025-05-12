import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <p>
          &copy; {currentYear} Recipe Finder App | 
          Built with React and Redux
        </p>
        <p>
          Data provided by <a 
            href="https://www.themealdb.com/api.php" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            TheMealDB API
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;