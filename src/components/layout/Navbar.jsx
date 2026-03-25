import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-glass py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center">
        <a href="#" className={`text-2xl font-bold tracking-tight transition-opacity duration-300 ${scrolled ? 'opacity-0 scale-y-0 hidden' : 'opacity-100'}`}>
          maCkey
        </a>
        
        {/* Desktop Nav */}
        <nav className={`hidden md:flex items-center gap-8 ${scrolled ? 'mx-auto' : ''}`}>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-muted font-semibold hover:text-primary transition-colors text-sm uppercase tracking-wider">
              {link.name}
            </a>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="border border-primary text-primary px-4 py-1.5 rounded-md hover:bg-primary hover:text-background transition-colors font-semibold text-sm uppercase tracking-wider">
            Resume
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-glass py-6 px-6 flex flex-col gap-6 items-center shadow-2xl">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold text-muted hover:text-primary uppercase tracking-wider">
              {link.name}
            </a>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="border border-primary text-primary px-8 py-3 rounded-md font-semibold mt-4">
            Resume
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
