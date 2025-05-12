import React from 'react';

const ErrorMessage = ({ message = 'An error occurred. Please try again.' }) => {
  return (
    <div className="error-message">
      <div className="error-icon">⚠️</div>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;