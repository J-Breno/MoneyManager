import React from 'react';
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode; 
  rightIcon?: React.ReactNode; 
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  className = '', 
  leftIcon, 
  rightIcon, 
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        <motion.input
            whileFocus={{ scale: 1.01 }}
            className={`w-full px-4 py-2 bg-dark-800 border ${error ? 'border-error-500' : 'border-dark-600'} rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              leftIcon ? 'pl-10' : ''
            } ${rightIcon ? 'pr-10' : ''} ${className}`}
            {...props as any} 
          />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-error-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;