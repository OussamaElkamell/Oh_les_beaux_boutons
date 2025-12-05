import React, { forwardRef } from 'react';
import { TechnologyCard } from '@/types/game';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';

interface SwipeableCardProps {
  card: TechnologyCard;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  isActive: boolean;
  onDirectionChange?: (direction: 'left' | 'right' | null) => void;
}

export const SwipeableCard = forwardRef<HTMLDivElement, SwipeableCardProps>(({
  card,
  onSwipeLeft,
  onSwipeRight,
  isActive,
  onDirectionChange
}, ref) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0.5, 1, 1, 1, 0.5]);
  
  // Indicator opacity based on swipe
  const leftIndicatorOpacity = useTransform(x, [-150, -50, 0], [1, 0.5, 0]);
  const rightIndicatorOpacity = useTransform(x, [0, 50, 150], [0, 0.5, 1]);
  
  // Border and shadow based on swipe direction
  const borderColor = useTransform(
    x,
    [-150, 0, 150],
    [
      'hsl(0 72% 51% / 0.5)',
      'hsl(var(--border))',
      'hsl(160 50% 40% / 0.5)'
    ]
  );
  
  const boxShadow = useTransform(
    x,
    [-150, 0, 150],
    [
      '0 8px 32px hsl(0 72% 51% / 0.15), 0 4px 16px hsl(0 0% 0% / 0.05)',
      '0 8px 32px hsl(0 0% 0% / 0.08)',
      '0 8px 32px hsl(160 50% 40% / 0.15), 0 4px 16px hsl(0 0% 0% / 0.05)'
    ]
  );

  const handleDrag = (_: any, info: PanInfo) => {
    if (!isActive || !onDirectionChange) return;
    
    if (info.offset.x > 50) {
      onDirectionChange('right');
    } else if (info.offset.x < -50) {
      onDirectionChange('left');
    } else {
      onDirectionChange(null);
    }
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (!isActive) return;
    
    const threshold = 100;
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    
    if (offset > threshold || velocity > 500) {
      onSwipeRight();
    } else if (offset < -threshold || velocity < -500) {
      onSwipeLeft();
    }
    
    onDirectionChange?.(null);
  };

  return (
    <motion.div
      className={`absolute inset-0 ${isActive ? 'z-10 cursor-grab active:cursor-grabbing' : 'z-0 pointer-events-none'}`}
      style={{ x, rotate, opacity }}
      drag={isActive ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, y: 20, opacity: 0 }}
      animate={{ 
        scale: isActive ? 1 : 0.95, 
        y: isActive ? 0 : 8,
        opacity: isActive ? 1 : 0.6
      }}
      exit={{ 
        x: x.get() > 0 ? 400 : -400,
        rotate: x.get() > 0 ? 20 : -20,
        opacity: 0,
        transition: { duration: 0.3 }
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      whileTap={isActive ? { scale: 1.01 } : {}}
    >
      {/* Swipe indicators */}
      <motion.div
        className="absolute -left-2 top-1/2 -translate-y-1/2 z-20"
        style={{ opacity: leftIndicatorOpacity }}
      >
        <div className="bg-destructive text-destructive-foreground px-4 py-2 rounded-full font-body font-semibold text-sm rotate-[-8deg] shadow-soft-lg">
          🔄 REMPLACER
        </div>
      </motion.div>
      
      <motion.div
        className="absolute -right-2 top-1/2 -translate-y-1/2 z-20"
        style={{ opacity: rightIndicatorOpacity }}
      >
        <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-body font-semibold text-sm rotate-[8deg] shadow-soft-lg">
          GARDER ✅
        </div>
      </motion.div>

      {/* Card */}
      <motion.div 
        className="h-full w-full rounded-3xl overflow-hidden flex flex-col select-none bg-card"
        style={{ 
          borderColor,
          boxShadow,
          borderWidth: '2px',
          borderStyle: 'solid',
        }}
      >
        {/* Category header */}
        <div className="relative px-6 py-4 font-body font-semibold text-sm tracking-wide text-center uppercase bg-secondary/50 text-secondary-foreground border-b border-border/50">
          <span className="flex items-center justify-center gap-2">
            <span className="text-base">🔍</span>
            {card.category}
          </span>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
          {/* Icon with soft glow */}
          <div className="relative mb-5">
            <div 
              className="absolute inset-0 rounded-full blur-2xl opacity-30"
              style={{ 
                background: 'hsl(var(--primary) / 0.3)',
                width: '120px', 
                height: '120px', 
                left: '-10px', 
                top: '-10px' 
              }}
            />
            <span className="relative text-7xl block">{card.icon}</span>
          </div>
          
          <h3 className="text-2xl font-heading text-foreground mb-2">{card.name}</h3>
          <p className="text-xs font-medium uppercase tracking-wider mb-4 text-muted-foreground font-body">
            Outil utilisé dans les écoles
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs font-body">
            {card.description}
          </p>
        </div>

        {/* Stats section */}
        <div className="border-t border-border/50 p-4 bg-secondary/30">
          <p className="text-xs text-center text-muted-foreground mb-3 font-medium font-body">
            📊 Évalue ces critères pour décider
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-2xl bg-card shadow-soft">
              <span className="text-2xl block mb-1">💰</span>
              <span className="text-xs text-muted-foreground block font-body">Coût</span>
              <span className="text-sm font-semibold text-foreground font-body">{card.stats.cost}</span>
            </div>
            <div className="text-center p-3 rounded-2xl bg-card shadow-soft">
              <span className="text-2xl block mb-1">🌍</span>
              <span className="text-xs text-muted-foreground block font-body">CO2/an</span>
              <span className="text-sm font-semibold text-foreground font-body">{card.stats.co2}</span>
            </div>
            <div className="text-center p-3 rounded-2xl bg-card shadow-soft">
              <span className="text-2xl block mb-1">📍</span>
              <span className="text-xs text-muted-foreground block font-body">Données</span>
              <span className="text-sm font-semibold text-foreground font-body">{card.stats.dataLocation}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

SwipeableCard.displayName = 'SwipeableCard';