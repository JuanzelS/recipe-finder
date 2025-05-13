import React from 'react';

const ErrorMessage = ({ message = 'An error occurred. Please try again.' }) => {
  return (
    <div className="bg-red-100 text-red-800 p-6 rounded-lg flex items-center space-x-4">
      <div className="text-2xl">⚠️</div>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;