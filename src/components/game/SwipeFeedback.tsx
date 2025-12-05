import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TechnologyCard } from '@/types/game';
import { getCardById } from '@/data/technologyCards';

interface FeedbackData {
  card: TechnologyCard;
  accepted: boolean;
  points: number;
}

interface SwipeFeedbackProps {
  feedback: FeedbackData | null;
  onComplete: () => void;
}

export const SwipeFeedback: React.FC<SwipeFeedbackProps> = ({ feedback, onComplete }) => {
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(onComplete, 1800);
      return () => clearTimeout(timer);
    }
  }, [feedback, onComplete]);

  if (!feedback) return null;

  const { card, accepted, points } = feedback;
  const isBigTech = card.type === 'big-tech';
  const alternative = card.alternativeId ? getCardById(card.alternativeId) : null;

  // Determine feedback type
  const getScenario = () => {
    if (isBigTech && !accepted) {
      return {
        type: 'correct-replace',
        emoji: '🎉',
        title: 'BIEN VU !',
        message: `Tu as identifié ${card.name} comme dépendance Big Tech`,
        bgClass: 'bg-pastel-green',
        textClass: 'text-primary',
        borderClass: 'border-primary/30'
      };
    }
    if (isBigTech && accepted) {
      return {
        type: 'kept-bigtech',
        emoji: '⚠️',
        title: 'ATTENTION',
        message: `${card.name} est un outil Big Tech`,
        subtitle: alternative ? `💡 Alternative NIRD: ${alternative.name}` : undefined,
        bgClass: 'bg-pastel-yellow',
        textClass: 'text-accent-foreground',
        borderClass: 'border-accent/30'
      };
    }
    if (!isBigTech && accepted) {
      return {
        type: 'correct-keep',
        emoji: '✅',
        title: 'EXCELLENT !',
        message: `${card.name} est un choix souverain et durable`,
        bgClass: 'bg-pastel-green',
        textClass: 'text-primary',
        borderClass: 'border-primary/30'
      };
    }
    // NIRD rejected
    return {
      type: 'rejected-nird',
      emoji: '🤔',
      title: 'RÉFLÉCHIS...',
      message: `${card.name} est une alternative NIRD souveraine !`,
      bgClass: 'bg-pastel-pink',
      textClass: 'text-destructive',
      borderClass: 'border-destructive/30'
    };
  };

  const scenario = getScenario();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        className="absolute inset-0 z-30 flex items-center justify-center p-4"
      >
        <motion.div
          className={`
            relative max-w-sm w-full p-6 rounded-3xl 
            ${scenario.bgClass} ${scenario.borderClass}
            border-2 shadow-soft-xl
          `}
          initial={{ rotate: -3 }}
          animate={{ rotate: 0 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          {/* Content */}
          <div className="text-center">
            <motion.span
              className="text-5xl block mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              {scenario.emoji}
            </motion.span>
            
            <motion.h3
              className={`font-heading text-2xl ${scenario.textClass} mb-2`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {scenario.title}
            </motion.h3>
            
            <motion.p
              className="text-foreground text-sm mb-3 font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {scenario.message}
            </motion.p>
            
            {scenario.subtitle && (
              <motion.p
                className="text-muted-foreground text-xs bg-card/80 rounded-2xl p-3 font-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {scenario.subtitle}
              </motion.p>
            )}
            
            {/* Points indicator */}
          <motion.div
  className={`
    mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full
    font-heading text-lg
    ${points > 0 ? 'bg-primary/10 text-primary' : points < 0 ? 'bg-destructive/10 text-destructive' : 'bg-secondary text-muted-foreground'}
  `}
  initial={{ scale: 0 }}
  animate={{ scale: [0, 1.1, 1] }}
  transition={{ 
    delay: 0.4, 
    type: 'tween',  // Changed from 'spring'
    duration: 0.5,
    ease: 'easeOut'
  }}
>
  {points > 0 ? '+' : ''}{points} points
</motion.div>
          </div>
          
          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-foreground/10 rounded-b-3xl overflow-hidden"
          >
            <motion.div
              className={`h-full ${points >= 0 ? 'bg-primary' : 'bg-destructive'}`}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 1.8, ease: 'linear' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};