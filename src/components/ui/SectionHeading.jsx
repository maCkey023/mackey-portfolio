import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ children }) => {
  return (
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="text-2xl md:text-3xl font-bold mb-10 text-muted uppercase tracking-widest border-b border-glass pb-4 inline-block"
    >
      {children}
    </motion.h2>
  );
};

export default SectionHeading;
