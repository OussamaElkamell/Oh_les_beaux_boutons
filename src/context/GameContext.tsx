import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { GameState, GameChoice, GameResults, TechnologyCard } from '@/types/game';
import { technologyCards, getRandomCards } from '@/data/technologyCards';
import { calculateResults, calculateChoicePoints } from '@/utils/scoreCalculator';
import { cardsApi } from '@/services/cardsApi';
import { resultsApi } from '@/services/resultsApi';
import { useAuth } from './AuthContext';

const DEFAULT_CARD_COUNT = 15;

interface GameContextType {
  gameState: GameState;
  results: GameResults | null;
  currentCard: TechnologyCard | null;
  progress: number;
  isComplete: boolean;
  gameCards: TechnologyCard[];
  isLoadingCards: boolean;
  makeChoice: (accepted: boolean) => void;
  resetGame: () => void;
  resumeGame: () => boolean;
  saveResultsToBackend: () => Promise<void>;
}

interface StoredGameState extends GameState {
  cardIds?: string[];
}

const initialGameState: GameState = {
  currentIndex: 0,
  choices: [],
  startedAt: Date.now(),
  isComplete: false
};

const STORAGE_KEY = 'nird-swipe-game-state';

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [gameCards, setGameCards] = useState<TechnologyCard[]>([]);
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [results, setResults] = useState<GameResults | null>(null);
  const [isLoadingCards, setIsLoadingCards] = useState(true);

  const currentCard = gameState.currentIndex < gameCards.length 
    ? gameCards[gameState.currentIndex] 
    : null;

  const progress = gameCards.length > 0 ? (gameState.currentIndex / gameCards.length) * 100 : 0;
  const isComplete = gameState.isComplete;

  // Load cards from API on mount
  useEffect(() => {
    const loadCards = async () => {
      setIsLoadingCards(true);
      try {
        const cards = await cardsApi.getRandomCards(DEFAULT_CARD_COUNT);
        if (cards.length > 0) {
          setGameCards(cards);
        } else {
          // Fallback to local data if API returns empty
          setGameCards(getRandomCards(DEFAULT_CARD_COUNT));
        }
      } catch (error) {
        console.warn('Failed to load cards from API, using local data:', error);
        setGameCards(getRandomCards(DEFAULT_CARD_COUNT));
      } finally {
        setIsLoadingCards(false);
      }
    };

    loadCards();
  }, []);

  // Save to localStorage with card IDs
  useEffect(() => {
    if (gameState.choices.length > 0 && !gameState.isComplete && gameCards.length > 0) {
      const stateToStore: StoredGameState = {
        ...gameState,
        cardIds: gameCards.map(c => c.id)
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToStore));
    }
  }, [gameState, gameCards]);

  // Calculate results when game completes
  useEffect(() => {
    if (gameState.isComplete && !results && gameCards.length > 0) {
      const calculatedResults = calculateResults(gameState, gameCards);
      setResults(calculatedResults);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [gameState.isComplete, results, gameCards]);

  const makeChoice = useCallback((accepted: boolean) => {
    if (!currentCard) return;

    const pointsEarned = calculateChoicePoints(currentCard, accepted);

    const choice: GameChoice = {
      cardId: currentCard.id,
      cardName: currentCard.name,
      cardType: currentCard.type,
      accepted,
      pointsEarned,
      timestamp: Date.now()
    };

    setGameState(prev => {
      const newIndex = prev.currentIndex + 1;
      const isComplete = newIndex >= gameCards.length;
      
      return {
        ...prev,
        currentIndex: newIndex,
        choices: [...prev.choices, choice],
        isComplete,
        completedAt: isComplete ? Date.now() : undefined
      };
    });
  }, [currentCard, gameCards.length]);

  const resetGame = useCallback(async () => {
    setIsLoadingCards(true);
    setResults(null);
    
    // Try to fetch from API, fallback to local data
    let newCards: TechnologyCard[];
    try {
      newCards = await cardsApi.getRandomCards(DEFAULT_CARD_COUNT);
      if (newCards.length === 0) {
        newCards = getRandomCards(DEFAULT_CARD_COUNT);
      }
    } catch {
      // API not available, use local data
      newCards = getRandomCards(DEFAULT_CARD_COUNT);
    }
    
    setGameCards(newCards);
    setGameState({
      ...initialGameState,
      startedAt: Date.now()
    });
    localStorage.removeItem(STORAGE_KEY);
    setIsLoadingCards(false);
  }, []);

  const resumeGame = useCallback((): boolean => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as StoredGameState;
        if (!parsed.isComplete && parsed.cardIds && parsed.cardIds.length > 0) {
          // Try to restore cards from local data (API cards might have different IDs)
          const restoredCards = parsed.cardIds
            .map(id => technologyCards.find(c => c.id === id))
            .filter((c): c is TechnologyCard => c !== undefined);
          
          if (restoredCards.length > 0 && parsed.currentIndex < restoredCards.length) {
            setGameCards(restoredCards);
            setGameState({
              currentIndex: parsed.currentIndex,
              choices: parsed.choices,
              startedAt: parsed.startedAt,
              isComplete: parsed.isComplete,
              completedAt: parsed.completedAt
            });
            return true;
          }
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    return false;
  }, []);

  const saveResultsToBackend = useCallback(async () => {
    if (!results) return;

    try {
      if (isAuthenticated) {
        await resultsApi.saveResult(results, gameState.choices, gameState.startedAt);
      } else {
        await resultsApi.saveResultAnonymous(results, gameState.choices, gameState.startedAt);
      }
    } catch (error) {
      console.warn('Failed to save results to backend:', error);
    }
  }, [results, gameState.choices, gameState.startedAt, isAuthenticated]);

  return (
    <GameContext.Provider value={{
      gameState,
      results,
      currentCard,
      progress,
      isComplete,
      gameCards,
      isLoadingCards,
      makeChoice,
      resetGame,
      resumeGame,
      saveResultsToBackend
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
