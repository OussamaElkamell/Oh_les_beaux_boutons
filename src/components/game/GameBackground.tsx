import React from 'react';
import { motion } from 'framer-motion';

interface GameBackgroundProps {
  swipeDirection: 'left' | 'right' | null;
}

export const GameBackground: React.FC<GameBackgroundProps> = ({ swipeDirection }) => {
  // Generate static positions for circles to avoid re-renders
  const circles = React.useMemo(() => 
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: `${15 + (i * 15)}%`,
      top: `${20 + (i % 3) * 25}%`,
      size: 200 + (i * 50),
      delay: i * 0.8,
      duration: 6 + (i * 0.5),
    })), []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Clean warm background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, hsl(var(--pastel-green) / 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, hsl(var(--pastel-blue) / 0.3) 0%, transparent 50%)',
        }}
      />

      {/* Animated wave circles */}
      {circles.map((circle) => (
        <div
          key={circle.id}
          className="absolute"
          style={{
            left: circle.left,
            top: circle.top,
            width: circle.size,
            height: circle.size,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Multiple expanding rings */}
          {[0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              className="absolute inset-0 rounded-full border border-primary/10"
              initial={{ scale: 1, opacity: 0.15 }}
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.15, 0.08, 0],
              }}
              transition={{
                duration: circle.duration,
                delay: circle.delay + (ring * 1.5),
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
          
          {/* Static center circle */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: circle.size * 0.3,
              height: circle.size * 0.3,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)`,
            }}
            animate={{
              scale: swipeDirection === 'right' ? 1.1 : swipeDirection === 'left' ? 0.9 : 1,
            }}
            transition={{ type: 'spring', damping: 20 }}
          />
        </div>
      ))}

      {/* Soft floating accent circles */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          right: '-5%',
          top: '10%',
          background: 'radial-gradient(circle, hsl(var(--pastel-yellow) / 0.4) 0%, transparent 70%)',
        }}
        animate={{
          y: [0, -20, 0],
          x: swipeDirection === 'right' ? 20 : 0,
        }}
        transition={{
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          x: { type: 'spring', damping: 20 },
        }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          width: 250,
          height: 250,
          left: '-5%',
          bottom: '15%',
          background: 'radial-gradient(circle, hsl(var(--pastel-pink) / 0.3) 0%, transparent 70%)',
        }}
        animate={{
          y: [0, 15, 0],
          x: swipeDirection === 'left' ? -20 : 0,
        }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          x: { type: 'spring', damping: 20 },
        }}
      />
    </div>
  );
};