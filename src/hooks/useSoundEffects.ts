import { useState, useCallback, useEffect } from 'react';
import { soundEffects } from '@/utils/soundEffects';

const SOUND_MUTED_KEY = 'nird-sound-muted';

export const useSoundEffects = () => {
  const [isMuted, setIsMuted] = useState(() => {
    const stored = localStorage.getItem(SOUND_MUTED_KEY);
    return stored === 'true';
  });

  useEffect(() => {
    soundEffects.setMuted(isMuted);
    localStorage.setItem(SOUND_MUTED_KEY, String(isMuted));
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const playSwipeLeft = useCallback(() => {
    soundEffects.playSwipeLeft();
  }, []);

  const playSwipeRight = useCallback(() => {
    soundEffects.playSwipeRight();
  }, []);

  const playFeedback = useCallback((isBigTech: boolean, accepted: boolean) => {
    soundEffects.playFeedback(isBigTech, accepted);
  }, []);

  return {
    isMuted,
    toggleMute,
    playSwipeLeft,
    playSwipeRight,
    playFeedback,
  };
};
