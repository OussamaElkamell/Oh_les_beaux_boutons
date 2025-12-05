import React from 'react';
import { motion } from 'framer-motion';
import { PillarScores } from '@/types/game';

interface PillarBreakdownProps {
  scores: PillarScores;
}

const pillars = [
  { key: 'inclusion' as const, label: 'Inclusion', icon: '♿', color: 'bg-blue-500' },
  { key: 'responsabilite' as const, label: 'Responsabilité', icon: '🔒', color: 'bg-nird-green' },
  { key: 'durabilite' as const, label: 'Durabilité', icon: '🌍', color: 'bg-yellow-500' }
];

export const PillarBreakdown: React.FC<PillarBreakdownProps> = ({ scores }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Scores par Pilier</h3>
      
      {pillars.map((pillar, index) => (
        <div key={pillar.key} className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-2">
              <span>{pillar.icon}</span>
              <span className="text-foreground">{pillar.label}</span>
            </span>
            <span className="font-bold text-foreground">{scores[pillar.key]}%</span>
          </div>
          
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${pillar.color} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${scores[pillar.key]}%` }}
              transition={{ duration: 1, delay: index * 0.2, ease: 'easeOut' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
