import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-home">Go to Homepage</Link>
    </div>
  );
};

export default NotFoundPage;