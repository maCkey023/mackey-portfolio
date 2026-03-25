import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-glass py-8 text-center bg-background mt-20">
      <p className="text-muted text-sm">
        &copy; {new Date().getFullYear()} Mackey Abdul Raheem T P. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
