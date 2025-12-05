import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WrongAnswer } from '@/types/game';
import { AlertTriangle, ThumbsDown, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface ActionPlanProps {
  wrongAnswers: WrongAnswer[];
}

export const ActionPlan: React.FC<ActionPlanProps> = ({ wrongAnswers }) => {
  const [expanded, setExpanded] = useState(false);
  
  const bigTechKept = wrongAnswers.filter(w => w.cardType === 'big-tech');
  const nirdRejected = wrongAnswers.filter(w => w.cardType === 'nird');
  
  // Calculate potential savings
  const totalSavingsEuros = bigTechKept.reduce((sum, w) => sum + (w.alternative?.savings?.euros || 0), 0);
  const totalSavingsCO2 = bigTechKept.reduce((sum, w) => sum + (w.alternative?.savings?.co2Kg || 0), 0);

  if (wrongAnswers.length === 0) {
    return (
      <div className="text-center py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
        >
          <span className="text-5xl mb-4 block">🎉</span>
        </motion.div>
        <p className="text-foreground font-bold text-lg">Parfait !</p>
        <p className="text-muted-foreground text-sm mt-2">
          Tu as fait les bons choix pour chaque outil.
          <br />Ton établissement est sur la voie de l'indépendance numérique !
        </p>
      </div>
    );
  }

  const displayedAnswers = expanded ? wrongAnswers : wrongAnswers.slice(0, 3);
  const hasMore = wrongAnswers.length > 3;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-accent-orange" />
        <h3 className="text-lg font-semibold text-foreground">Plan d'Action Personnalisé</h3>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="text-center">
          <span className="text-2xl font-bold text-neon-pink">{bigTechKept.length}</span>
          <p className="text-xs text-muted-foreground">Big Tech gardées</p>
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold text-accent-orange">{nirdRejected.length}</span>
          <p className="text-xs text-muted-foreground">NIRD rejetées</p>
        </div>
        {(totalSavingsEuros > 0 || totalSavingsCO2 > 0) && (
          <>
            <div className="text-center">
              <span className="text-2xl font-bold text-nird-green">{totalSavingsEuros}€</span>
              <p className="text-xs text-muted-foreground">économies possibles/an</p>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-nird-green">{totalSavingsCO2}kg</span>
              <p className="text-xs text-muted-foreground">CO2 évitables/an</p>
            </div>
          </>
        )}
      </div>
      
      {/* Wrong Answers List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {displayedAnswers.map((wrong, index) => (
            <motion.div
              key={wrong.cardId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border ${
                wrong.cardType === 'big-tech' 
                  ? 'bg-neon-pink/5 border-neon-pink/30' 
                  : 'bg-accent-orange/5 border-accent-orange/30'
              }`}
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  wrong.cardType === 'big-tech' ? 'bg-neon-pink/20' : 'bg-accent-orange/20'
                }`}>
                  <span className="text-xl">{wrong.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {wrong.cardType === 'big-tech' ? (
                      <AlertTriangle className="w-4 h-4 text-neon-pink" />
                    ) : (
                      <ThumbsDown className="w-4 h-4 text-accent-orange" />
                    )}
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      wrong.cardType === 'big-tech' 
                        ? 'bg-neon-pink/20 text-neon-pink' 
                        : 'bg-accent-orange/20 text-accent-orange'
                    }`}>
                      {wrong.cardType === 'big-tech' ? 'BIG TECH GARDÉE' : 'NIRD REJETÉE'}
                    </span>
                  </div>
                  <p className="font-semibold text-foreground mt-1">
                    Tu as {wrong.userChoice === 'kept' ? 'gardé' : 'remplacé'} {wrong.cardName}
                  </p>
                  <p className="text-xs text-muted-foreground">{wrong.category}</p>
                </div>
              </div>

              {/* Explanation */}
              <div className="mb-3 p-3 rounded-lg bg-black/20">
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {wrong.cardType === 'big-tech' ? '⚠️' : '🤔'} {wrong.explanation}
                </p>
              </div>

              {/* Consequence */}
              <div className="mb-3">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  {wrong.cardType === 'big-tech' ? 'Conséquence :' : 'Avantage manqué :'}
                </p>
                <p className="text-sm text-foreground/80">{wrong.consequence}</p>
              </div>

              {/* Stats */}
              <div className="flex gap-2 mb-3 text-xs">
                <span className="px-2 py-1 rounded bg-white/10 text-muted-foreground">
                  💰 {wrong.stats.cost}
                </span>
                <span className="px-2 py-1 rounded bg-white/10 text-muted-foreground">
                  🌍 {wrong.stats.co2}
                </span>
                <span className="px-2 py-1 rounded bg-white/10 text-muted-foreground">
                  📍 {wrong.stats.dataLocation}
                </span>
              </div>

              {/* Alternative (for Big Tech) */}
              {wrong.alternative && (
                <div className="p-3 rounded-lg bg-nird-green/10 border border-nird-green/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-nird-green" />
                    <span className="text-xs font-semibold text-nird-green">ALTERNATIVE NIRD RECOMMANDÉE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{wrong.alternative.icon}</span>
                    <div>
                      <p className="font-medium text-foreground text-sm">{wrong.alternative.name}</p>
                      <p className="text-xs text-muted-foreground">{wrong.alternative.description}</p>
                    </div>
                  </div>
                  {wrong.alternative.savings && (
                    <div className="mt-2 flex gap-2">
                      {wrong.alternative.savings.euros !== undefined && wrong.alternative.savings.euros > 0 && (
                        <span className="text-xs text-nird-green font-medium">
                          → {wrong.alternative.savings.euros}€/an économisés
                        </span>
                      )}
                      {wrong.alternative.savings.co2Kg !== undefined && wrong.alternative.savings.co2Kg > 0 && (
                        <span className="text-xs text-nird-green font-medium">
                          → {wrong.alternative.savings.co2Kg}kg CO2 évités
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Correct Action (for NIRD rejected) */}
              {wrong.cardType === 'nird' && (
                <div className="p-3 rounded-lg bg-nird-green/10 border border-nird-green/30">
                  <p className="text-sm text-nird-green font-medium">
                    ✅ {wrong.correctAction}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show More Button */}
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full py-3 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg bg-white/5 hover:bg-white/10"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Voir moins
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Voir {wrongAnswers.length - 3} erreurs de plus
            </>
          )}
        </button>
      )}
    </div>
  );
};
