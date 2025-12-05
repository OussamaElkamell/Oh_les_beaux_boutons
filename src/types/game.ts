export interface TechnologyCard {
  id: string;
  name: string;
  type: 'big-tech' | 'nird';
  category: string;
  description: string;
  icon: string;
  pillar: 'inclusion' | 'responsabilite' | 'durabilite';
  stats: {
    cost: string;
    co2: string;
    dataLocation: string;
  };
  alternativeId?: string;
  savings?: {
    euros?: number;
    co2Kg?: number;
  };
}

export interface GameChoice {
  cardId: string;
  cardName: string;
  cardType: 'big-tech' | 'nird';
  accepted: boolean;
  pointsEarned: number;
  timestamp: number;
}

export interface GameState {
  currentIndex: number;
  choices: GameChoice[];
  startedAt: number;
  completedAt?: number;
  isComplete: boolean;
}

export interface PillarScores {
  inclusion: number;
  responsabilite: number;
  durabilite: number;
}

export interface Recommendation {
  title: string;
  description: string;
  impact: string;
  icon: string;
}

export interface WrongAnswer {
  cardId: string;
  cardName: string;
  cardType: 'big-tech' | 'nird';
  userChoice: 'kept' | 'replaced';
  category: string;
  icon: string;
  explanation: string;
  consequence: string;
  correctAction: string;
  stats: {
    cost: string;
    co2: string;
    dataLocation: string;
  };
  alternative?: {
    name: string;
    description: string;
    icon: string;
    savings?: { euros?: number; co2Kg?: number };
  };
  alternativeName?: string;
  reason?: string;
  recommendation?: string;
}

export interface GameResults {
  overallScore: number;
  pillarScores: PillarScores;
  bigTechAccepted: number;
  nirdAccepted: number;
  totalCards: number;
  recommendations: Recommendation[];
  wrongAnswers: WrongAnswer[];
  completedAt: number;
  duration: number;
  // New fields for backend
  totalPoints: number;
  totalSavingsEuros: number;
  totalSavingsCo2: number;
  correctChoices: number;
}

// User profile from backend
export interface UserProfile {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  school_name?: string;
  school_type?: string;
  profile: {
    total_games_played: number;
    best_nird_score: number;
    total_points_earned: number;
  };
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name?: string;
  last_name?: string;
  school_name?: string;
  school_type?: string;
}
