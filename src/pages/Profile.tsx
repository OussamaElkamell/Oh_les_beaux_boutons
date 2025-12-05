import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { AppHeader } from '@/components/AppHeader';
import { resultsApi, ApiGameResult } from '@/services/resultsApi';
import { 
  User, Mail, School, Trophy, Gamepad2, Star, Award, 
  Clock, TrendingUp, Shield, Zap, Crown, Target, Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Badge definitions for collection display
const allBadges = [
  {
    id: 'bigtech-addict',
    name: 'Accro Big Tech',
    description: 'Score inférieur à 30%',
    icon: '🤖',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    minScore: 0,
    maxScore: 30,
  },
  {
    id: 'digital-dependent',
    name: 'Dépendant Digital',
    description: 'Score entre 30% et 50%',
    icon: '📱',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    minScore: 30,
    maxScore: 50,
  },
  {
    id: 'balanced-user',
    name: 'Utilisateur Équilibré',
    description: 'Score entre 50% et 70%',
    icon: '⚖️',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    minScore: 50,
    maxScore: 70,
  },
  {
    id: 'nird-conscious',
    name: 'Conscient NIRD',
    description: 'Score entre 70% et 85%',
    icon: '🌱',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    minScore: 70,
    maxScore: 85,
  },
  {
    id: 'nird-champion',
    name: 'Champion NIRD',
    description: 'Score entre 85% et 95%',
    icon: '🏆',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    minScore: 85,
    maxScore: 95,
  },
  {
    id: 'nird-master',
    name: 'Maître NIRD',
    description: 'Score supérieur à 95%',
    icon: '👑',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    minScore: 95,
    maxScore: 101,
  },
];

const bonusBadges = [
  {
    id: 'perfect-score',
    name: 'Score Parfait',
    description: '100% sur une partie',
    icon: '💯',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
  },
  {
    id: 'speed-demon',
    name: 'Éclair',
    description: 'Moins de 2 minutes',
    icon: '⚡',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
  },
  {
    id: 'nird-purist',
    name: 'Puriste NIRD',
    description: 'Aucune Big Tech acceptée',
    icon: '🛡️',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
  },
  {
    id: 'pillar-master',
    name: 'Maître des Piliers',
    description: '80%+ sur tous les piliers',
    icon: '🏛️',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
  },
];

const BadgeCard: React.FC<{ badge: any; earned: boolean; index: number }> = ({ badge, earned, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05 }}
    className={`
      relative rounded-xl p-4 border-2 transition-all
      ${earned 
        ? `${badge.bgColor} ${badge.borderColor} shadow-md` 
        : 'bg-muted/30 border-muted/50 opacity-50'
      }
    `}
  >
    <div className="flex items-center gap-3">
      <div className={`text-3xl ${earned ? '' : 'grayscale'}`}>
        {badge.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`font-bold text-sm ${earned ? badge.color : 'text-muted-foreground'}`}>
          {badge.name}
        </h4>
        <p className="text-xs text-muted-foreground truncate">
          {badge.description}
        </p>
      </div>
    </div>
    {earned && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full p-0.5"
      >
        <Award className="w-3 h-3" />
      </motion.div>
    )}
  </motion.div>
);

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [results, setResults] = useState<ApiGameResult[]>([]);
  const [loadingResults, setLoadingResults] = useState(true);

  // Fetch results from API
  useEffect(() => {
  const fetchResults = async () => {
    if (!isAuthenticated) return;

    try {
      const data = await resultsApi.getResults();
      setResults(Array.isArray(data) ? data : []); // <-- force array
    } catch (error) {
      console.error('Failed to fetch results:', error);
      setResults([]); // fallback
    } finally {
      setLoadingResults(false);
    }
  };

  if (isAuthenticated) {
    fetchResults();
  }
}, [isAuthenticated]);


  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Calculate stats from fetched results
  const stats = {
    total_games_played: results.length,
    best_nird_score: results.length > 0 
      ? Math.max(...results.map(r => r.nird_score)) 
      : 0,
    total_points_earned: results.reduce((sum, r) => sum + r.total_points, 0),
  };
  
  // Determine earned badges based on best score
  const earnedBadgeIds: string[] = [];
  
  // Check score-based badges
  for (const badge of allBadges) {
    if (stats.best_nird_score >= badge.minScore && stats.best_nird_score < badge.maxScore) {
      earnedBadgeIds.push(badge.id);
      break;
    }
  }

  // Check bonus badges
  const hasPerfectScore = results.some(r => r.nird_score === 100);
  if (hasPerfectScore) earnedBadgeIds.push('perfect-score');

  const hasPillarMaster = results.some(r => 
    r.inclusion_score >= 80 && 
    r.responsabilite_score >= 80 && 
    r.durabilite_score >= 80
  );
  if (hasPillarMaster) earnedBadgeIds.push('pillar-master');

  const totalBadgesEarned = earnedBadgeIds.length;

  // Format date for display
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl p-6 border border-border shadow-soft mb-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-bold text-primary">
                {user.first_name?.[0] || user.username?.[0] || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-heading font-bold text-foreground mb-1">
                {user.first_name} {user.last_name}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                <Mail className="w-4 h-4" />
                <span className="truncate">{user.email}</span>
              </div>
              {user.school_name && (
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <School className="w-4 h-4" />
                  <span>{user.school_name}</span>
                  {user.school_type && (
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-xs">
                      {user.school_type}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          <div className="bg-card rounded-2xl p-4 text-center border border-border shadow-soft">
            <Gamepad2 className="w-6 h-6 mx-auto mb-2 text-primary" />
            <span className="text-2xl font-bold text-foreground block">
              {loadingResults ? '...' : stats.total_games_played}
            </span>
            <p className="text-xs text-muted-foreground">Parties jouées</p>
          </div>
          <div className="bg-card rounded-2xl p-4 text-center border border-border shadow-soft">
            <Trophy className="w-6 h-6 mx-auto mb-2 text-accent" />
            <span className="text-2xl font-bold text-foreground block">
              {loadingResults ? '...' : `${stats.best_nird_score}%`}
            </span>
            <p className="text-xs text-muted-foreground">Meilleur score</p>
          </div>
          <div className="bg-card rounded-2xl p-4 text-center border border-border shadow-soft">
            <Star className="w-6 h-6 mx-auto mb-2 text-primary" />
            <span className="text-2xl font-bold text-foreground block">
              {loadingResults ? '...' : stats.total_points_earned}
            </span>
            <p className="text-xs text-muted-foreground">Points totaux</p>
          </div>
        </motion.div>

        {/* Game History */}
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-card rounded-3xl p-6 border border-border shadow-soft mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-heading font-bold text-foreground">
                Historique des parties
              </h2>
            </div>
            <div className="space-y-3">
              {results.slice(0, 5).map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{result.nird_score}%</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(result.completed_at)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{result.total_points} pts</p>
                    <p className="text-xs text-muted-foreground">{result.cards_played} cartes</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Badge Collection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-3xl p-6 border border-border shadow-soft mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-heading font-bold text-foreground">
                Collection de Badges
              </h2>
            </div>
            <span className="text-sm text-muted-foreground">
              {totalBadgesEarned} / {allBadges.length + bonusBadges.length}
            </span>
          </div>

          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Badges de Score</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {allBadges.map((badge, index) => (
              <BadgeCard 
                key={badge.id} 
                badge={badge} 
                earned={earnedBadgeIds.includes(badge.id)} 
                index={index}
              />
            ))}
          </div>

          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Badges Bonus</h3>
          <div className="grid grid-cols-2 gap-3">
            {bonusBadges.map((badge, index) => (
              <BadgeCard 
                key={badge.id} 
                badge={badge} 
                earned={earnedBadgeIds.includes(badge.id)} 
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Play Again CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Button
            onClick={() => navigate('/game')}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Gamepad2 className="w-5 h-5 mr-2" />
            Jouer une partie
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
