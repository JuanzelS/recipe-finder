import React from 'react';

const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="loader-spinner mb-4"></div>
      {message && <p className="text-gray-500">{message}</p>}
    </div>
  );
};

export default Loader;