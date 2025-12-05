import React from 'react';
import { motion } from 'framer-motion';

interface GameIntroProps {
  onStart: () => void;
}

export const GameIntro: React.FC<GameIntroProps> = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="max-w-md w-full p-8 rounded-3xl bg-card border border-border/50 shadow-soft-xl"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <motion.span
            className="text-5xl block mb-4"
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎮
          </motion.span>
          <h2 className="font-heading text-2xl text-foreground mb-2">
            Comment jouer ?
          </h2>
          <p className="text-muted-foreground text-sm font-body">
            Évalue chaque outil utilisé dans les écoles
          </p>
        </div>

        {/* Instructions */}
        <div className="space-y-3 mb-8">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-secondary/50">
            <span className="text-2xl">👉</span>
            <div>
              <p className="font-semibold text-foreground text-sm font-body">Regarde les statistiques</p>
              <p className="text-xs text-muted-foreground font-body">Coût, impact CO2, localisation des données</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-secondary/50">
            <span className="text-2xl">🤔</span>
            <div>
              <p className="font-semibold text-foreground text-sm font-body">Pose-toi la question</p>
              <p className="text-xs text-muted-foreground font-body">Est-ce un outil respectueux et souverain ?</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-8 p-4 rounded-2xl bg-pastel-blue/30">
            <div className="text-center">
              <span className="text-3xl block mb-1">👈</span>
              <span className="text-destructive font-semibold text-xs font-body">REMPLACER</span>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <span className="text-3xl block mb-1">👉</span>
              <span className="text-primary font-semibold text-xs font-body">GARDER</span>
            </div>
          </div>
        </div>

        {/* Start button */}
        <motion.button
          onClick={onStart}
          className="w-full py-4 px-6 rounded-full font-body font-semibold text-lg bg-foreground text-background shadow-soft-lg hover:shadow-soft-xl transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Commencer le Swipe
        </motion.button>
        
        <p className="text-center text-xs text-muted-foreground mt-4 font-body">
          Tu apprendras après chaque swipe si ton choix était bon !
        </p>
      </motion.div>
    </motion.div>
  );
};