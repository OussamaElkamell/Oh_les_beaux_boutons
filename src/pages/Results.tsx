import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { useAuth } from '@/context/AuthContext';
import { ScoreGauge } from '@/components/results/ScoreGauge';
import { PillarBreakdown } from '@/components/results/PillarBreakdown';
import { ActionPlan } from '@/components/results/ActionPlan';
import { exportResultsPDF } from '@/utils/pdfExport';
import { Download, RotateCcw, Share2, Save, Award, Trophy, Star } from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Badge definitions
const badges = [
  {
    id: 'bigtech-addict',
    name: 'Accro Big Tech',
    description: 'Tu ne peux pas résister aux GAFAM',
    icon: '🤖',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    condition: (score: number) => score < 30,
  },
  {
    id: 'digital-dependent',
    name: 'Dépendant Digital',
    description: 'Tu fais quelques efforts, mais pas assez',
    icon: '📱',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    condition: (score: number) => score >= 30 && score < 50,
  },
  {
    id: 'balanced-user',
    name: 'Utilisateur Équilibré',
    description: 'Tu trouves un bon compromis',
    icon: '⚖️',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    condition: (score: number) => score >= 50 && score < 70,
  },
  {
    id: 'nird-conscious',
    name: 'Conscient NIRD',
    description: 'Tu fais attention à ta souveraineté numérique',
    icon: '🌱',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    condition: (score: number) => score >= 70 && score < 85,
  },
  {
    id: 'nird-champion',
    name: 'Champion NIRD',
    description: 'Tu es un exemple de souveraineté numérique !',
    icon: '🏆',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    condition: (score: number) => score >= 85 && score < 95,
  },
  {
    id: 'nird-master',
    name: 'Maître NIRD',
    description: 'Tu es un véritable expert de la souveraineté numérique !',
    icon: '👑',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    condition: (score: number) => score >= 95,
  },
];

// Bonus badges based on specific achievements
const bonusBadges = [
  {
    id: 'perfect-score',
    name: 'Score Parfait',
    description: 'Tu as répondu parfaitement à toutes les questions !',
    icon: '💯',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    condition: (results: any) => results.overallScore === 100,
  },
  {
    id: 'speed-demon',
    name: 'Éclair',
    description: 'Terminé en moins de 2 minutes',
    icon: '⚡',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    condition: (results: any) => results.duration < 120000,
  },
  {
    id: 'nird-purist',
    name: 'Puriste NIRD',
    description: 'Aucune Big Tech acceptée',
    icon: '🛡️',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    condition: (results: any) => results.bigTechAccepted === 0,
  },
  {
    id: 'pillar-master',
    name: 'Maître des Piliers',
    description: 'Score supérieur à 80% sur tous les piliers',
    icon: '🏛️',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    condition: (results: any) => Object.values(results.pillarScores).every((score: any) => score >= 80),
  },
];

const BadgeCard: React.FC<{ badge: any; earned: boolean; index: number }> = ({ badge, earned, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.1 }}
    className={`
      relative rounded-xl p-4 border-2 transition-all
      ${earned 
        ? `${badge.bgColor} ${badge.borderColor} shadow-lg` 
        : 'bg-muted/30 border-muted opacity-50'
      }
    `}
  >
    <div className="flex items-start gap-3">
      <div className={`text-4xl ${earned ? '' : 'grayscale'}`}>
        {badge.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`font-bold text-sm mb-1 ${earned ? badge.color : 'text-muted-foreground'}`}>
          {badge.name}
        </h4>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {badge.description}
        </p>
      </div>
    </div>
    {earned && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
        className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1"
      >
        <Award className="w-4 h-4" />
      </motion.div>
    )}
  </motion.div>
);

const Results: React.FC = () => {
  const navigate = useNavigate();
  const { results, resetGame, saveResultsToBackend } = useGame();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Redirect if no results
  useEffect(() => {
    if (!results) {
      navigate('/game');
    }
  }, [results, navigate]);

  if (!results) {
    return null;
  }

  // Determine earned badges
  const earnedMainBadge = badges.find(badge => badge.condition(results.overallScore));
  const earnedBonusBadges = bonusBadges.filter(badge => badge.condition(results));
  const totalBadgesEarned = earnedBonusBadges.length + (earnedMainBadge ? 1 : 0);

  const handleDownloadPDF = () => {
    exportResultsPDF(results);
  };

  const handleRestart = () => {
    resetGame();
    navigate('/game');
  };

  const handleSaveResults = async () => {
    if (!isAuthenticated) {
      toast({
        title: 'Connexion requise',
        description: 'Connectez-vous pour sauvegarder vos résultats',
      });
      navigate('/auth');
      return;
    }

    try {
      await saveResultsToBackend();
      toast({
        title: 'Résultats sauvegardés!',
        description: 'Vos résultats ont été enregistrés dans votre profil',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Impossible de sauvegarder',
        variant: 'destructive',
      });
    }
  };

  const handleShare = async () => {
    const badgeText = earnedMainBadge ? ` Badge: ${earnedMainBadge.name}` : '';
    const text = `🎯 Mon score NIRD Tinder : ${results.overallScore}% !${badgeText} Découvre si ton établissement est Big Tech dépendant ou NIRD résistant.`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mon Score NIRD Tinder',
          text,
          url: window.location.origin
        });
      } catch {
        // User cancelled or error
      }
    } else {
      navigator.clipboard.writeText(text);
      toast({
        title: 'Copié!',
        description: 'Le texte a été copié dans le presse-papiers',
      });
    }
  };

  const formatDuration = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0 
      ? `${minutes}min ${remainingSeconds}s`
      : `${remainingSeconds}s`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AppHeader />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Score section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
            Ton Profil NIRD
          </h2>
          
          <div className="flex justify-center mb-6">
            <ScoreGauge score={results.overallScore} size={220} />
          </div>

          <p className="text-muted-foreground text-sm">
            Évaluation terminée en {formatDuration(results.duration)}
          </p>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <div className="bg-card rounded-2xl p-4 text-center border border-border shadow-soft">
            <span className="text-3xl font-bold text-destructive">{results.bigTechAccepted}</span>
            <p className="text-xs text-muted-foreground mt-1">Big Tech acceptées</p>
          </div>
          <div className="bg-card rounded-2xl p-4 text-center border border-border shadow-soft">
            <span className="text-3xl font-bold text-primary">{results.nirdAccepted}</span>
            <p className="text-xs text-muted-foreground mt-1">NIRD choisies</p>
          </div>
        </motion.div>

        {/* Main Badge */}
        {earnedMainBadge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className={`
              relative rounded-2xl p-6 border-2 
              ${earnedMainBadge.bgColor} ${earnedMainBadge.borderColor}
              shadow-lg overflow-hidden
            `}>
              <div className="absolute top-0 right-0 opacity-20 text-8xl -mt-4 -mr-4">
                {earnedMainBadge.icon}
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className={`w-6 h-6 ${earnedMainBadge.color}`} />
                  <h3 className="text-lg font-bold text-foreground">Badge Principal</h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{earnedMainBadge.icon}</div>
                  <div>
                    <h4 className={`text-xl font-bold ${earnedMainBadge.color} mb-1`}>
                      {earnedMainBadge.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {earnedMainBadge.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bonus Badges */}
        {earnedBonusBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">
                Badges Bonus ({earnedBonusBadges.length})
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {earnedBonusBadges.map((badge, index) => (
                <BadgeCard key={badge.id} badge={badge} earned={true} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* All Available Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">
              Collection de Badges
            </h3>
            <span className="text-sm text-muted-foreground">
              {totalBadgesEarned} / {badges.length + bonusBadges.length}
            </span>
          </div>
          
          <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3">Badges de Score</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {badges.map((badge, index) => (
                <BadgeCard 
                  key={badge.id} 
                  badge={badge} 
                  earned={badge.id === earnedMainBadge?.id} 
                  index={index}
                />
              ))}
            </div>

            <h4 className="text-sm font-semibold text-muted-foreground mb-3">Badges de Performance</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bonusBadges.map((badge, index) => (
                <BadgeCard 
                  key={badge.id} 
                  badge={badge} 
                  earned={earnedBonusBadges.some(b => b.id === badge.id)} 
                  index={index}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pillar breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-2xl p-6 mb-8 border border-border shadow-soft"
        >
          <PillarBreakdown scores={results.pillarScores} />
        </motion.div>

        {/* Action plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-card rounded-2xl p-6 mb-8 border border-border shadow-soft"
        >
          <ActionPlan wrongAnswers={results.wrongAnswers} />
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <Button
            onClick={handleDownloadPDF}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Télécharger le rapport PDF
          </Button>

          {isAuthenticated ? (
            <Button
              onClick={handleSaveResults}
              variant="outline"
              className="w-full border-border"
              size="lg"
            >
              <Save className="w-5 h-5 mr-2" />
              Sauvegarder mes résultats
            </Button>
          ) : (
            <Button
              onClick={() => navigate('/auth')}
              variant="outline"
              className="w-full border-border"
              size="lg"
            >
              <Save className="w-5 h-5 mr-2" />
              Se connecter pour sauvegarder
            </Button>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleShare}
              variant="outline"
              className="flex-1 border-border"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
            
            <Button
              onClick={handleRestart}
              variant="outline"
              className="flex-1 border-border"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Recommencer
            </Button>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          Projet Nuit de l'Info 2025 – Démarche NIRD
        </motion.p>
      </main>
    </div>
  );
};

export default Results;