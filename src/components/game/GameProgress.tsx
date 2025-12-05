import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GameProgressProps {
  current: number;
  total: number;
  nirdScore: number;
  lastPoints?: number;
}

export const GameProgress: React.FC<GameProgressProps> = ({
  current,
  total,
  nirdScore,
  lastPoints
}) => {
  const progress = (current / total) * 100;
  
  return (
    <div className="w-full">
      {/* Progress info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground font-body">
            {current} / {total}
          </span>
          <span className="text-xs text-muted-foreground font-body">cartes</span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Points animation */}
          <AnimatePresence>
            {lastPoints !== undefined && lastPoints !== 0 && (
              <motion.span
                key={current}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className={`font-heading text-sm ${
                  lastPoints > 0 ? 'text-primary' : 'text-destructive'
                }`}
              >
                {lastPoints > 0 ? '+' : ''}{lastPoints}
              </motion.span>
            )}
          </AnimatePresence>
          
          <motion.div 
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border/50"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 0.3 }}
            key={nirdScore}
          >
            <span className="text-xs text-muted-foreground font-body">Score</span>
            <span className={`font-heading text-sm ${
              nirdScore >= 70 ? 'text-primary' : 
              nirdScore >= 40 ? 'text-accent' : 'text-destructive'
            }`}>
              {nirdScore}%
            </span>
          </motion.div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', damping: 20 }}
        />
        
        {/* Segment markers */}
        <div className="absolute inset-0 flex">
          {[...Array(Math.min(total, 20))].map((_, i) => (
            <div 
              key={i} 
              className="flex-1 border-r border-background/50 last:border-r-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
};