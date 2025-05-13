/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#ff6b6b',
            dark: '#e74c4c'
          },
          secondary: '#4ecdc4',
          background: '#f8f9fa',
        },
        boxShadow: {
          card: '0 4px 6px rgba(0, 0, 0, 0.1)',
          hover: '0 8px 15px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: [],
  }