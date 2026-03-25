import React from 'react';
import { motion } from 'framer-motion';

// Task 1: Generate an array of strictly sequential image paths in descending order.
const generateImages = () => {
  const images = [];
  for (let i = 21; i >= 1; i--) {
    // Assuming Vite handles the public folder strictly or the assets exist in the public path.
    // If they are in `public/assets/images`, this path will resolve correctly.
    images.push(`/assets/images/U-SPetrol${i}.jpg`); 
  }
  return images;
};

const images = generateImages();

const ImageCarousel = () => {
  return (
    <div className="w-full overflow-hidden py-10 relative mb-16">
      {/* Left and Right Gradient Masks for a clean fade-out effect */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none"></div>
      
      {/* 
        Task 2: The Infinite Looping Carousel 
        We render the images twice and animate x to create a seamless infinite loop.
      */}
      <motion.div 
        className="flex flex-row gap-6 w-max cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ right: 0, left: -((350 + 24) * 21) }} // (width + gap) * total items
        animate={{ x: [0, -((350 + 24) * 21)] }}
        transition={{ 
          repeat: Infinity, 
          duration: 50, 
          ease: "linear" 
        }}
        whileHover={{ animationPlayState: "paused" }} // Optional: pause on hover
      >
        {/* Double the array to allow for the infinite scrolling illusion */}
        {[...images, ...images].map((src, index) => (
          <motion.div 
            key={index} 
            className="w-[350px] shrink-0 aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            whileHover={{ scale: 1.03, zIndex: 20 }}
          >
            <img 
              src={src} 
              alt={`U.S-Petrol Interface Preview ${index}`} 
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="w-full h-full flex flex-col gap-2 items-center justify-center text-zinc-600 font-mono text-xs bg-zinc-950 p-4 text-center border border-zinc-900"><span>Image Missing</span><span class="text-[10px] break-all">' + src + '</span></div>';
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ImageCarousel;
