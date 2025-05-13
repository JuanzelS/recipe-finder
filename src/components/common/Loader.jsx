// src/components/common/Loader.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div 
        className="border-4 border-gray-200 rounded-full w-12 h-12"
        style={{ borderTopColor: '#ff6b6b' }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      {message && (
        <motion.p 
          className="text-gray-500 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default Loader;