import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MotionAnimation = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles for the diagonal rain effect
    const numParticles = 100;
    
    const newParticles = Array.from({ length: numParticles }).map((_, i) => {
      return {
        id: i,
        x: Math.random() * 120 - 10, // Start across a wider horizontal area
        y: Math.random() * 120 - 10, // Start vertically
        delay: Math.random() * 2, // Random delay for staggered falling
        duration: Math.random() * 2 + 2, // 2 to 4 seconds to fall
      };
    });
    
    setParticles(newParticles);
  }, []);

  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none bg-transparent transition-colors duration-300" 
      style={{ 
        zIndex: -1,
        overflow: 'hidden'
      }}
    >
      {particles.map((p) => {
        return (
          <motion.div
            key={p.id}
            initial={{ 
              x: `${p.x}vw`, 
              y: `${p.y - 50}vh`, // Start higher up
              opacity: 0 
            }}
            animate={{
              x: [`${p.x}vw`, `${p.x + 30}vw`], // Move right and down diagonally
              y: [`${p.y - 50}vh`, `${p.y + 50}vh`],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
            style={{
              position: 'absolute',
              width: '12px',
              height: '3px',
              backgroundColor: '#3B82F6', // Blue color matching the image
              borderRadius: '999px',
              transform: 'rotate(45deg)', // Angle the dashes
              willChange: 'transform, opacity',
            }}
          />
        );
      })}
    </div>
  );
};

export default MotionAnimation;
