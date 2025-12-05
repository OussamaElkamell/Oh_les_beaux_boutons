import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { TechnologyCard } from '@/types/game';
import { SwipeableCard } from './SwipeableCard';

interface CardStackProps {
  cards: TechnologyCard[];
  currentIndex: number;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onDirectionChange?: (direction: 'left' | 'right' | null) => void;
}

export const CardStack: React.FC<CardStackProps> = ({
  cards,
  currentIndex,
  onSwipeLeft,
  onSwipeRight,
  onDirectionChange
}) => {
  // Show current card and 2 preview cards behind
  const visibleCards = cards.slice(currentIndex, currentIndex + 3);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="popLayout">
        {visibleCards.map((card, index) => (
          <SwipeableCard
            key={card.id}
            card={card}
            onSwipeLeft={onSwipeLeft}
            onSwipeRight={onSwipeRight}
            isActive={index === 0}
            onDirectionChange={index === 0 ? onDirectionChange : undefined}
          />
        ))}
      </AnimatePresence>
      
      {/* Empty state */}
      {visibleCards.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <span className="text-6xl block mb-4">🎉</span>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">
              C'est terminé !
            </h3>
            <p className="text-muted-foreground">
              Calcul de vos résultats...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
