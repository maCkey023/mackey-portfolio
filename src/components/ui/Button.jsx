import React from 'react';

const Button = ({ children, variant = 'primary', className = '', href, target, rel, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300";
  const variants = {
    primary: "bg-white text-background hover:-translate-y-1 hover:shadow-lg hover:shadow-white/10",
    secondary: "bg-transparent border border-glass text-white backdrop-blur-md hover:bg-surface hover:-translate-y-1",
    outline: "border border-primary text-primary hover:bg-primary/10 hover:-translate-y-1"
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component 
      href={href}
      target={target}
      rel={rel}
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
