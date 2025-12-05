import { GameState, GameResults, PillarScores, Recommendation, WrongAnswer, TechnologyCard } from '@/types/game';

// Educational explanations for Big Tech tools
const bigTechExplanations: Record<string, { explanation: string; consequence: string }> = {
  'google-drive': {
    explanation: 'Google Drive stocke vos données aux USA et analyse automatiquement le contenu de vos fichiers pour le ciblage publicitaire.',
    consequence: 'Vos documents sensibles (notes, dossiers élèves) sont accessibles aux autorités américaines via le Cloud Act.'
  },
  'gmail': {
    explanation: 'Gmail scanne le contenu de vos emails pour afficher des publicités ciblées et alimenter les profils publicitaires.',
    consequence: 'Les communications de votre établissement sont analysées et exploitées commercialement.'
  },
  'zoom': {
    explanation: 'Zoom a connu plusieurs failles de sécurité majeures et transmet des données aux serveurs américains.',
    consequence: 'Vos réunions pédagogiques peuvent être interceptées ou les enregistrements stockés sans contrôle.'
  },
  'microsoft-365': {
    explanation: 'Microsoft 365 collecte des données de télémétrie extensives sur l\'utilisation de chaque utilisateur.',
    consequence: 'Microsoft connaît vos habitudes de travail, vos documents consultés et votre activité quotidienne.'
  },
  'google-classroom': {
    explanation: 'Google Classroom collecte massivement les données des élèves pour construire des profils publicitaires.',
    consequence: 'Les données éducatives de vos élèves mineurs sont exploitées à des fins commerciales.'
  },
  'windows': {
    explanation: 'Windows 11 envoie des données de télémétrie à Microsoft et impose des mises à jour qui rendent les anciens PC obsolètes.',
    consequence: 'Obsolescence programmée : vos ordinateurs deviennent inutilisables plus rapidement.'
  },
  'google-search': {
    explanation: 'Google Search crée une bulle de filtre et track toutes vos recherches pour le ciblage publicitaire.',
    consequence: 'Les recherches de vos élèves sont enregistrées et influencent les résultats qu\'ils voient.'
  },
  'chrome': {
    explanation: 'Chrome intègre un tracking profond et consomme beaucoup de RAM, ralentissant les machines.',
    consequence: 'Historique de navigation collecté, performances dégradées sur les ordinateurs modestes.'
  },
  'apple-macbook': {
    explanation: 'Les MacBook sont difficiles à réparer et ont une durée de vie limitée par les mises à jour logicielles.',
    consequence: 'Coût élevé, impossibilité de réparer, et impact environnemental important.'
  },
  'chatgpt': {
    explanation: 'ChatGPT utilise vos conversations pour entraîner ses modèles et est soumis aux lois américaines.',
    consequence: 'Les contenus générés et vos questions sont stockés et réutilisés par OpenAI.'
  }
};

// Educational explanations for NIRD tools (when wrongly rejected)
const nirdExplanations: Record<string, { explanation: string; benefit: string }> = {
  'nextcloud': {
    explanation: 'Nextcloud est une solution de cloud souverain hébergeable en France avec chiffrement de bout en bout.',
    benefit: 'Contrôle total de vos données, conformité RGPD garantie, et économies significatives.'
  },
  'protonmail': {
    explanation: 'ProtonMail offre un chiffrement de bout en bout et est hébergé en Suisse, hors juridiction américaine.',
    benefit: 'Confidentialité garantie pour les communications sensibles de votre établissement.'
  },
  'jitsi': {
    explanation: 'Jitsi Meet est une solution open source auto-hébergeable sans création de compte requise.',
    benefit: 'Visioconférences gratuites et sécurisées, accessibles même aux élèves sans équipement sophistiqué.'
  },
  'libreoffice': {
    explanation: 'LibreOffice fonctionne hors ligne, utilise des formats ouverts et ne collecte aucune donnée.',
    benefit: 'Économies de licence, pas de dépendance internet, et pérennité des documents.'
  },
  'moodle': {
    explanation: 'Moodle est un LMS open source utilisé par des millions d\'établissements dans le monde.',
    benefit: 'Personnalisation totale, données élèves protégées, et communauté éducative active.'
  },
  'linux': {
    explanation: 'Linux prolonge la vie des ordinateurs de plusieurs années et ne collecte aucune donnée.',
    benefit: 'Économies matérielles majeures et réduction significative de l\'empreinte carbone.'
  },
  'qwant': {
    explanation: 'Qwant est un moteur de recherche français qui ne track pas ses utilisateurs.',
    benefit: 'Résultats neutres, pas de bulle de filtre, et protection de la vie privée des élèves.'
  },
  'firefox': {
    explanation: 'Firefox est open source avec une protection native contre le tracking et une faible consommation.',
    benefit: 'Respect de la vie privée, bonnes performances même sur des machines modestes.'
  },
  'reconditionne': {
    explanation: 'Les PC reconditionnés offrent des performances équivalentes avec un impact environnemental réduit de 80%.',
    benefit: 'Économies majeures, démarche éco-responsable exemplaire pour les élèves.'
  },
  'mistral': {
    explanation: 'Mistral AI est une entreprise française proposant des modèles open source et souverains.',
    benefit: 'IA performante avec garanties sur le traitement des données en France.'
  }
};

// Points system
const POINTS = {
  CORRECT_REJECT_BIG_TECH: 10,
  CORRECT_ACCEPT_NIRD: 10,
  WRONG_ACCEPT_BIG_TECH: 0,
  WRONG_REJECT_NIRD: 0,
};

export const calculateResults = (
  gameState: GameState,
  gameCards: TechnologyCard[]
): GameResults => {
  const { choices, startedAt, completedAt } = gameState;
  
  let bigTechAccepted = 0;
  let nirdAccepted = 0;
  let totalPoints = 0;
  let totalSavingsEuros = 0;
  let totalSavingsCo2 = 0;
  let correctChoices = 0;
  
  const pillarCounts = {
    inclusion: { correct: 0, total: 0 },
    responsabilite: { correct: 0, total: 0 },
    durabilite: { correct: 0, total: 0 }
  };

  const recommendations: Recommendation[] = [];
  const wrongAnswers: WrongAnswer[] = [];
  const acceptedBigTech: string[] = [];

  // Helper to find card by id
  const getCardById = (cardId: string): TechnologyCard | undefined => {
    return gameCards.find(c => c.id === cardId);
  };

  choices.forEach(choice => {
    const card = getCardById(choice.cardId);
    if (!card) return;

    pillarCounts[card.pillar].total++;

    if (card.type === 'big-tech') {
      if (choice.accepted) {
        bigTechAccepted++;
        acceptedBigTech.push(card.id);
        
        // Wrong: Kept Big Tech
        const explanation = bigTechExplanations[card.id];
        const alternative = gameCards.find(c => c.id === card.alternativeId);
        
        wrongAnswers.push({
          cardId: card.id,
          cardName: card.name,
          cardType: 'big-tech',
          userChoice: 'kept',
          category: card.category,
          icon: card.icon,
          explanation: explanation?.explanation || `${card.name} est un service Big Tech qui collecte vos données.`,
          consequence: explanation?.consequence || 'Dépendance à un service étranger sans contrôle sur vos données.',
          correctAction: `Remplacer par ${alternative?.name || 'une alternative NIRD'}`,
          stats: card.stats,
          alternative: alternative ? {
            name: alternative.name,
            description: alternative.description,
            icon: alternative.icon,
            savings: alternative.savings
          } : undefined,
          alternativeName: alternative?.name || '',
          reason: explanation?.explanation || '',
          recommendation: `Remplacer par ${alternative?.name || 'une alternative NIRD'}`
        });
      } else {
        // Correct: Rejected Big Tech
        pillarCounts[card.pillar].correct++;
        totalPoints += POINTS.CORRECT_REJECT_BIG_TECH;
        correctChoices++;
        
        // Add savings from the alternative
        const alternative = gameCards.find(c => c.id === card.alternativeId);
        if (alternative?.savings) {
          totalSavingsEuros += alternative.savings.euros || 0;
          totalSavingsCo2 += alternative.savings.co2Kg || 0;
        }
      }
    } else {
      // NIRD card
      if (choice.accepted) {
        nirdAccepted++;
        pillarCounts[card.pillar].correct++;
        totalPoints += POINTS.CORRECT_ACCEPT_NIRD;
        correctChoices++;
        
        // Add savings from this NIRD card
        if (card.savings) {
          totalSavingsEuros += card.savings.euros || 0;
          totalSavingsCo2 += card.savings.co2Kg || 0;
        }
      } else {
        // Wrong: Rejected NIRD
        const explanation = nirdExplanations[card.id];
        
        wrongAnswers.push({
          cardId: card.id,
          cardName: card.name,
          cardType: 'nird',
          userChoice: 'replaced',
          category: card.category,
          icon: card.icon,
          explanation: explanation?.explanation || `${card.name} est une solution souveraine et respectueuse.`,
          consequence: explanation?.benefit || 'Vous avez manqué une opportunité d\'indépendance numérique.',
          correctAction: `Garder ${card.name} - c'est une alternative NIRD souveraine`,
          stats: card.stats,
          alternative: undefined,
          alternativeName: '',
          reason: explanation?.explanation || '',
          recommendation: `Garder ${card.name}`
        });
      }
    }
  });

  // Calculate pillar scores as percentages
  const pillarScores: PillarScores = {
    inclusion: pillarCounts.inclusion.total > 0 
      ? Math.round((pillarCounts.inclusion.correct / pillarCounts.inclusion.total) * 100)
      : 0,
    responsabilite: pillarCounts.responsabilite.total > 0
      ? Math.round((pillarCounts.responsabilite.correct / pillarCounts.responsabilite.total) * 100)
      : 0,
    durabilite: pillarCounts.durabilite.total > 0
      ? Math.round((pillarCounts.durabilite.correct / pillarCounts.durabilite.total) * 100)
      : 0
  };

  // Overall score: weighted average of pillar scores
  const overallScore = Math.round(
    (pillarScores.inclusion + pillarScores.responsabilite + pillarScores.durabilite) / 3
  );

  // Generate recommendations based on accepted Big Tech
  acceptedBigTech.forEach(cardId => {
    const card = getCardById(cardId);
    if (!card) return;
    
    const alternative = gameCards.find(c => c.id === card.alternativeId);
    if (alternative && alternative.savings) {
      recommendations.push({
        title: `Remplacer ${card.name} par ${alternative.name}`,
        description: alternative.description,
        impact: alternative.savings.euros 
          ? `${alternative.savings.euros}€/an économisés`
          : `${alternative.savings.co2Kg}kg CO2 évités`,
        icon: alternative.icon
      });
    }
  });

  // Add general recommendations if score is low
  if (overallScore < 50) {
    recommendations.push({
      title: 'Formation NIRD recommandée',
      description: 'Sensibilisez votre équipe aux enjeux de souveraineté numérique',
      impact: 'Amélioration +20% du score',
      icon: '📖'
    });
  }

  return {
    overallScore,
    pillarScores,
    bigTechAccepted,
    nirdAccepted,
    totalCards: choices.length,
    recommendations: recommendations.slice(0, 5),
    wrongAnswers,
    completedAt: completedAt || Date.now(),
    duration: (completedAt || Date.now()) - startedAt,
    totalPoints,
    totalSavingsEuros,
    totalSavingsCo2,
    correctChoices
  };
};

export const getScoreColor = (score: number): string => {
  if (score >= 70) return 'hsl(var(--nird-green))';
  if (score >= 40) return 'hsl(var(--accent-orange))';
  return 'hsl(var(--neon-pink))';
};

export const getScoreLabel = (score: number): string => {
  if (score >= 80) return 'Excellent ! 🎉';
  if (score >= 60) return 'Bon début 👍';
  if (score >= 40) return 'À améliorer 💪';
  return 'Big Tech dépendant 😱';
};

// Calculate points for a single choice
export const calculateChoicePoints = (
  card: TechnologyCard,
  accepted: boolean
): number => {
  if (card.type === 'big-tech') {
    return accepted ? POINTS.WRONG_ACCEPT_BIG_TECH : POINTS.CORRECT_REJECT_BIG_TECH;
  } else {
    return accepted ? POINTS.CORRECT_ACCEPT_NIRD : POINTS.WRONG_REJECT_NIRD;
  }
};
