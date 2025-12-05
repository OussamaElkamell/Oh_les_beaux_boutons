import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { TechnologyCard } from '@/types/game';
import { CardStack } from '@/components/game/CardStack';
import { GameProgress } from '@/components/game/GameProgress';
import { SwipeButtons } from '@/components/game/SwipeButtons';
import { GameBackground } from '@/components/game/GameBackground';
import { SwipeFeedback } from '@/components/game/SwipeFeedback';
import { GameIntro } from '@/components/game/GameIntro';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { RotateCcw, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';

interface FeedbackData {
  card: TechnologyCard;
  accepted: boolean;
  points: number;
}

// Calculate points based on choice
const calculatePoints = (card: TechnologyCard, accepted: boolean): number => {
  const isBigTech = card.type === 'big-tech';
  
  if (isBigTech && !accepted) return 10;  // Correct: replace big tech
  if (!isBigTech && accepted) return 15;  // Correct: keep NIRD
  if (!isBigTech && !accepted) return -5; // Wrong: rejected NIRD
  return 0; // Kept big tech (neutral)
};

const Game: React.FC = () => {
  const navigate = useNavigate();
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [totalPoints, setTotalPoints] = useState(0);
  
  const { isMuted, toggleMute, playSwipeLeft, playSwipeRight, playFeedback } = useSoundEffects();
  
  const { 
    gameState, 
    currentCard, 
    progress, 
    isComplete, 
    gameCards,
    isLoadingCards,
    makeChoice, 
    resetGame,
    resumeGame
  } = useGame();

  // Try to resume game on mount
  useEffect(() => {
    const hasProgress = resumeGame();
    if (hasProgress) {
      setShowIntro(false);
    }
  }, [resumeGame]);

  // Navigate to results when complete
  useEffect(() => {
    if (isComplete && !feedback) {
      const timer = setTimeout(() => {
        navigate('/results');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isComplete, feedback, navigate]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentCard || isComplete || showIntro || feedback) return;
      
      if (e.key === 'ArrowLeft') {
        handleSwipeLeft();
      } else if (e.key === 'ArrowRight') {
        handleSwipeRight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCard, isComplete, showIntro, feedback]);

  const handleSwipeLeft = useCallback(() => {
    if (!currentCard || feedback) return;
    
    playSwipeLeft();
    const points = calculatePoints(currentCard, false);
    const isBigTech = currentCard.type === 'big-tech';
    playFeedback(isBigTech, false);
    
    setFeedback({ card: currentCard, accepted: false, points });
    setTotalPoints(prev => prev + points);
    makeChoice(false);
    setSwipeDirection(null);
  }, [currentCard, makeChoice, feedback, playSwipeLeft, playFeedback]);

  const handleSwipeRight = useCallback(() => {
    if (!currentCard || feedback) return;
    
    playSwipeRight();
    const points = calculatePoints(currentCard, true);
    const isBigTech = currentCard.type === 'big-tech';
    playFeedback(isBigTech, true);
    
    setFeedback({ card: currentCard, accepted: true, points });
    setTotalPoints(prev => prev + points);
    makeChoice(true);
    setSwipeDirection(null);
  }, [currentCard, makeChoice, feedback, playSwipeRight, playFeedback]);

  const handleFeedbackComplete = useCallback(() => {
    setFeedback(null);
  }, []);

  const handleReset = useCallback(() => {
    resetGame();
    setTotalPoints(0);
    setShowIntro(true);
    setFeedback(null);
  }, [resetGame]);

  // Calculate current NIRD score based on choices
  const currentNirdScore = gameState.choices.length > 0
    ? Math.round(
        (gameState.choices.filter(c => {
          const card = gameCards.find(t => t.id === c.cardId);
          return (card?.type === 'nird' && c.accepted) || (card?.type === 'big-tech' && !c.accepted);
        }).length / gameState.choices.length) * 100
      )
    : 0;

  // Show loading state while cards are loading
  if (isLoadingCards && gameCards.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement des cartes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
          <AppHeader variant="transparent" />
      {/* Animated background */}
      <GameBackground swipeDirection={swipeDirection} />
      
      {/* Intro overlay */}
      <AnimatePresence>
        {showIntro && (
          <GameIntro onStart={() => setShowIntro(false)} />
        )}
      </AnimatePresence>
      
      {/* Feedback overlay */}
      <SwipeFeedback feedback={feedback} onComplete={handleFeedbackComplete} />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
    
        
        {/* Game Controls Bar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="px-4 py-2"
        >
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <h1 className="font-heading text-xl text-foreground">
              NIRD swipe
            </h1>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={toggleMute}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-card shadow-soft border border-border/50 text-muted-foreground hover:text-foreground hover:shadow-soft-md transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={isMuted ? "Activer le son" : "Couper le son"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </motion.button>
              
              <motion.button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-soft border border-border/50 text-muted-foreground hover:text-foreground hover:shadow-soft-md transition-all font-body"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">Reset</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Main game area */}
        <main className="flex-1 flex flex-col px-4 pb-8 max-w-lg mx-auto w-full">
          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 p-4 rounded-3xl bg-card shadow-soft border border-border/50"
          >
            <GameProgress
              current={gameState.currentIndex}
              total={gameCards.length}
              nirdScore={currentNirdScore}
              lastPoints={feedback?.points}
            />
          </motion.div>

          {/* Card stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="relative w-full"
            style={{ height: 'calc(100vh - 300px)', minHeight: '450px', maxHeight: '600px' }}
          >
            <CardStack
              cards={gameCards}
              currentIndex={gameState.currentIndex}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              onDirectionChange={setSwipeDirection}
            />
          </motion.div>

          {/* Swipe buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <SwipeButtons
              onReject={handleSwipeLeft}
              onAccept={handleSwipeRight}
              disabled={!currentCard || isComplete || !!feedback}
            />
            
            <p className="text-center text-xs text-muted-foreground mt-8 font-body">
              <span className="hidden sm:inline">Glisse ou utilise </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-foreground font-mono text-xs">
                ← →
              </span>
              <span className="hidden sm:inline"> pour décider</span>
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Game;