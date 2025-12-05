// Web Audio API Sound Effects Manager
class SoundEffects {
  private audioContext: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.5;
  private initialized: boolean = false;

  constructor() {
    // Initialize on first user interaction
    if (typeof window !== 'undefined') {
      const initAudio = () => {
        this.init();
        document.removeEventListener('click', initAudio);
        document.removeEventListener('touchstart', initAudio);
        document.removeEventListener('keydown', initAudio);
      };
      document.addEventListener('click', initAudio);
      document.addEventListener('touchstart', initAudio);
      document.addEventListener('keydown', initAudio);
    }
  }

  private init() {
    if (this.initialized) return;
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported');
    }
  }

  private getContext(): AudioContext | null {
    if (!this.audioContext) {
      this.init();
    }
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = this.volume) {
    if (this.isMuted) return;

    const ctx = this.getContext();
    if (!ctx) return;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    gainNode.gain.setValueAtTime(volume * 0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }

  // Whoosh sound for swipe left (reject)
  playSwipeLeft() {
    if (this.isMuted) return;
    
    const ctx = this.getContext();
    if (!ctx) return;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sawtooth';
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.2);

    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);

    gainNode.gain.setValueAtTime(this.volume * 0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.2);
  }

  // Whoosh sound for swipe right (accept)
  playSwipeRight() {
    if (this.isMuted) return;
    
    const ctx = this.getContext();
    if (!ctx) return;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sawtooth';
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.15);

    oscillator.frequency.setValueAtTime(200, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15);

    gainNode.gain.setValueAtTime(this.volume * 0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.15);
  }

  // Success chime (correct choice)
  playSuccess() {
    if (this.isMuted) return;
    
    // Two-note ascending chime
    this.playTone(523.25, 0.15, 'sine'); // C5
    setTimeout(() => {
      this.playTone(659.25, 0.25, 'sine'); // E5
    }, 100);
  }

  // Error buzz (wrong choice)
  playError() {
    if (this.isMuted) return;
    
    const ctx = this.getContext();
    if (!ctx) return;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(150, ctx.currentTime);

    gainNode.gain.setValueAtTime(this.volume * 0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.2);
  }

  // Neutral click (kept big tech)
  playNeutral() {
    if (this.isMuted) return;
    this.playTone(300, 0.1, 'triangle', this.volume * 0.5);
  }

  // Play feedback based on card type and choice
  playFeedback(isBigTech: boolean, accepted: boolean) {
    if (isBigTech && !accepted) {
      this.playSuccess(); // Replaced big tech - good!
    } else if (!isBigTech && accepted) {
      this.playSuccess(); // Kept NIRD - good!
    } else if (!isBigTech && !accepted) {
      this.playError(); // Rejected NIRD - bad!
    } else {
      this.playNeutral(); // Kept big tech - neutral
    }
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  getMuted(): boolean {
    return this.isMuted;
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  getVolume(): number {
    return this.volume;
  }
}

export const soundEffects = new SoundEffects();
