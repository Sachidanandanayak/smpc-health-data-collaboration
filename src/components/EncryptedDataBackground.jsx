import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const EncryptedDataBackground = () => {
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate 80-120 particles
    const numParticles = Math.floor(Math.random() * 41) + 80;
    const colors = ['#00F5FF', '#8B5CF6', '#3B82F6', '#FFFFFF'];
    
    const newParticles = Array.from({ length: numParticles }).map((_, i) => {
      const width = Math.floor(Math.random() * 6) + 3; // 3px to 8px
      const height = Math.floor(Math.random() * 4) + 2; // 2px to 5px
      const color = colors[Math.floor(Math.random() * colors.length)];
      const blur = Math.random() > 0.7 ? Math.random() * 2 + 1 : 0;
      const isLarge = Math.random() > 0.9;
      
      // Target random values for animation
      const randomX = Math.floor(Math.random() * 61) - 30; // -30 to 30
      const duration = Math.floor(Math.random() * 16) + 10; // 10 to 25
      const delay = Math.random() * 5; // 0 to 5
      
      return {
        id: i,
        width: isLarge ? width * 1.5 : width,
        height: isLarge ? height * 1.5 : height,
        x: Math.random() * 100, // random start X (%)
        y: Math.random() * 100, // random start Y (%)
        color,
        blur,
        isLarge,
        randomX,
        duration,
        delay
      };
    });
    
    setParticles(newParticles);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none" 
      style={{ 
        zIndex: -1,
        background: 'linear-gradient(135deg, #050816 0%, #0B1120 50%, #111827 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Ambient Glows */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-[#00F5FF]/10 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -60, 60, 0],
          y: [0, 60, -60, 0],
          scale: [1, 1.3, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[20%] right-[20%] w-[35vw] h-[35vw] rounded-full bg-[#8B5CF6]/10 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, 80, -80, 0],
          y: [0, 80, -80, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] rounded-full bg-[#3B82F6]/10 blur-[120px]"
      />

      {/* Particles */}
      {particles.map((p) => {
        const parallaxX = mousePosition.x * 50 * (p.isLarge ? 2 : 1);
        const parallaxY = mousePosition.y * 50 * (p.isLarge ? 2 : 1);

        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{
              x: [parallaxX, p.randomX + parallaxX],
              y: [parallaxY, -200 + parallaxY],
              rotate: [0, 360],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.width,
              height: p.height,
              backgroundColor: p.color,
              borderRadius: '999px',
              filter: `blur(${p.blur}px)`,
              boxShadow: p.isLarge ? `0 0 10px ${p.color}, 0 0 20px ${p.color}` : 'none',
              willChange: 'transform, opacity',
            }}
          />
        );
      })}
    </div>
  );
};

export default EncryptedDataBackground;
