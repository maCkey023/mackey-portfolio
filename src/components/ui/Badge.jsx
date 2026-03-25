import React from 'react';

const Badge = ({ children, className = '' }) => {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
