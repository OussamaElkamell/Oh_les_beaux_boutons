import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getScoreColor, getScoreLabel } from '@/utils/scoreCalculator';

interface ScoreGaugeProps {
  score: number;
  size?: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, size = 200 }) => {
  const [displayScore, setDisplayScore] = useState(0);
  
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  const offset = circumference - (displayScore / 100) * circumference;
  const scoreColor = getScoreColor(displayScore);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg className="absolute transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="stroke-muted"
          strokeWidth={strokeWidth}
          opacity={0.3}
        />
        {/* Animated progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={scoreColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
      </svg>

      {/* Center content */}
      <div className="text-center z-10">
        <motion.span
          className="text-5xl font-bold"
          style={{ color: scoreColor }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {displayScore}%
        </motion.span>
        <p className="text-sm text-muted-foreground mt-1">Score NIRD</p>
        <motion.p 
          className="text-xs mt-2 font-medium text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {getScoreLabel(displayScore)}
        </motion.p>
      </div>
    </div>
  );
};
