import React from 'react';
import { motion } from 'framer-motion';
import { X, Heart } from 'lucide-react';

interface SwipeButtonsProps {
  onReject: () => void;
  onAccept: () => void;
  disabled?: boolean;
}

export const SwipeButtons: React.FC<SwipeButtonsProps> = ({
  onReject,
  onAccept,
  disabled = false
}) => {
  return (
    <div className="flex items-center justify-center gap-8">
      {/* Replace button */}
      <motion.button
        onClick={onReject}
        disabled={disabled}
        className="relative group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Remplacer cette technologie"
      >
        {/* Button */}
        <div className={`
          relative w-16 h-16 rounded-full flex items-center justify-center
          border-2 border-destructive/30 bg-card shadow-soft-md
          group-hover:border-destructive group-hover:bg-destructive/5 group-hover:shadow-soft-lg
          transition-all duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}>
          <X className="w-7 h-7 text-destructive" />
        </div>
        
        {/* Label */}
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs font-semibold text-destructive whitespace-nowrap font-body">
          REMPLACER
        </span>
      </motion.button>

      {/* Keep button */}
      <motion.button
        onClick={onAccept}
        disabled={disabled}
        className="relative group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Garder cette technologie"
      >
        {/* Button */}
        <div className={`
          relative w-16 h-16 rounded-full flex items-center justify-center
          border-2 border-primary/30 bg-card shadow-soft-md
          group-hover:border-primary group-hover:bg-primary/5 group-hover:shadow-soft-lg
          transition-all duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}>
          <Heart className="w-7 h-7 text-primary" fill="currentColor" />
        </div>
        
        {/* Label */}
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs font-semibold text-primary whitespace-nowrap font-body">
          GARDER
        </span>
      </motion.button>
    </div>
  );
};
