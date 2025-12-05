import { useState, useCallback, useRef } from 'react';

interface SwipeState {
  isDragging: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  deltaX: number;
  deltaY: number;
}

interface UseSwipeGesturesProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  threshold?: number;
}

export const useSwipeGestures = ({ 
  onSwipeLeft, 
  onSwipeRight, 
  threshold = 100 
}: UseSwipeGesturesProps) => {
  const [swipeState, setSwipeState] = useState<SwipeState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    deltaX: 0,
    deltaY: 0
  });

  const elementRef = useRef<HTMLDivElement>(null);

  const handleStart = useCallback((clientX: number, clientY: number) => {
    setSwipeState({
      isDragging: true,
      startX: clientX,
      startY: clientY,
      currentX: clientX,
      currentY: clientY,
      deltaX: 0,
      deltaY: 0
    });
  }, []);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    setSwipeState(prev => {
      if (!prev.isDragging) return prev;
      return {
        ...prev,
        currentX: clientX,
        currentY: clientY,
        deltaX: clientX - prev.startX,
        deltaY: clientY - prev.startY
      };
    });
  }, []);

  const handleEnd = useCallback(() => {
    setSwipeState(prev => {
      if (Math.abs(prev.deltaX) > threshold) {
        if (prev.deltaX > 0) {
          onSwipeRight();
        } else {
          onSwipeLeft();
        }
      }
      return {
        isDragging: false,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        deltaX: 0,
        deltaY: 0
      };
    });
  }, [onSwipeLeft, onSwipeRight, threshold]);

  const handlers = {
    onMouseDown: (e: React.MouseEvent) => handleStart(e.clientX, e.clientY),
    onMouseMove: (e: React.MouseEvent) => handleMove(e.clientX, e.clientY),
    onMouseUp: handleEnd,
    onMouseLeave: () => {
      if (swipeState.isDragging) handleEnd();
    },
    onTouchStart: (e: React.TouchEvent) => {
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    },
    onTouchMove: (e: React.TouchEvent) => {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    },
    onTouchEnd: handleEnd
  };

  const rotation = swipeState.deltaX * 0.05; // Max ~5 degrees rotation
  const opacity = Math.max(0.5, 1 - Math.abs(swipeState.deltaX) / 500);

  return {
    handlers,
    elementRef,
    swipeState,
    transform: {
      x: swipeState.deltaX,
      y: swipeState.deltaY * 0.3,
      rotation,
      opacity
    },
    direction: swipeState.deltaX > 20 ? 'right' : swipeState.deltaX < -20 ? 'left' : null
  };
};
