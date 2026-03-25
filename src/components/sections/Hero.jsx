import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolio';
import Button from '../ui/Button';
import { Briefcase, MapPin } from 'lucide-react';
import LiveTerminal from '../ui/LiveTerminal';

const Typewriter = ({ phrases }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 40 : 80;
    const currentPhrase = phrases[currentPhraseIndex];

    const handleType = () => {
      if (!isDeleting && currentText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        const nextText = isDeleting
          ? currentPhrase.substring(0, currentText.length - 1)
          : currentPhrase.substring(0, currentText.length + 1);
        setCurrentText(nextText);
      }
    };

    const timer = setTimeout(handleType, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentPhraseIndex, phrases]);

  return (
    <span className="text-primary font-bold">
      {currentText}
      <span className="animate-pulse border-r-2 border-primary ml-1 h-full inline-block align-middle pb-1"></span>
    </span>
  );
};

const Hero = () => {
  const { hero } = portfolioData;
  const typewriterPhrases = [
    "Python Backend Systems",
    "Enterprise RAG Applications",
    "AI/ML Engineering",
    "FastAPI Microservices"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column (Text & CTAs) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold leading-tight mb-6 mt-10 lg:mt-0">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                {hero.name}
              </span>
            </motion.h1>

            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl text-muted font-medium mb-8 h-12">
              I build <Typewriter phrases={typewriterPhrases} />
            </motion.h2>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted/80 leading-relaxed max-w-xl mb-10">
              I build scalable Python backends and enterprise AI integrations.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10">
              <Button href="#projects" variant="primary">View My Work</Button>
              <Button href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" variant="secondary">GitHub Profile</Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-background/50 backdrop-blur-md text-sm text-muted shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                <Briefcase size={16} className="text-primary" />
                <span className="font-medium">AI Software Engineer @ Infotact Solutions</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-background/50 backdrop-blur-md text-sm text-muted shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                <MapPin size={16} className="text-primary" />
                <span className="font-medium">Vadakara, Kerala</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column (The Terminal) */}
          <div className="hidden lg:block w-full">
            <LiveTerminal />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
