import { apiClient } from './api';
import { GameResults, GameChoice, WrongAnswer } from '@/types/game';

// Payload matching Django GameResultCreateSerializer
interface SaveResultPayload {
  nird_score: number;
  total_points: number;
  inclusion_score: number;
  responsabilite_score: number;
  durabilite_score: number;
  total_savings_euros: number;
  total_savings_co2: number;
  cards_played: number;
  correct_choices: number;
  started_at: string;
  choices: {
    card_id: string;
    card_name: string;
    card_type: string;
    accepted: boolean;
    points_earned: number;
    timestamp: string;
  }[];
  wrong_answers: {
    card_id: string;
    card_name: string;
    card_type: string;
    alternative_name: string;
    reason: string;
    recommendation: string;
  }[];
}

export interface ApiGameResult {
  id: number;
  nird_score: number;
  total_points: number;
  inclusion_score: number;
  responsabilite_score: number;
  durabilite_score: number;
  total_savings_euros: number;
  total_savings_co2: number;
  cards_played: number;
  correct_choices: number;
  started_at: string;
  completed_at: string;
  choices?: {
    card_id: string;
    card_name: string;
    card_type: string;
    accepted: boolean;
    points_earned: number;
    timestamp: string;
  }[];
  wrong_answers?: {
    card_id: string;
    card_name: string;
    card_type: string;
    alternative_name: string;
    reason: string;
    recommendation: string;
  }[];
}

export const resultsApi = {
  async saveResult(
    results: GameResults,
    choices: GameChoice[],
    startedAt: number
  ): Promise<ApiGameResult> {
    const payload: SaveResultPayload = {
      nird_score: results.overallScore,
      total_points: results.totalPoints,
      inclusion_score: results.pillarScores.inclusion,
      responsabilite_score: results.pillarScores.responsabilite,
      durabilite_score: results.pillarScores.durabilite,
      total_savings_euros: results.totalSavingsEuros,
      total_savings_co2: results.totalSavingsCo2,
      cards_played: results.totalCards,
      correct_choices: results.correctChoices,
      started_at: new Date(startedAt).toISOString(),
      choices: choices.map((c) => ({
        card_id: c.cardId,
        card_name: c.cardName,
        card_type: c.cardType,
        accepted: c.accepted,
        points_earned: c.pointsEarned,
        timestamp: new Date(c.timestamp).toISOString(),
      })),
      wrong_answers: results.wrongAnswers.map((w: WrongAnswer) => ({
        card_id: w.cardId,
        card_name: w.cardName,
        card_type: w.cardType,
        alternative_name: w.alternative?.name || w.alternativeName || '',
        reason: w.explanation || w.reason || '',
        recommendation: w.correctAction || w.recommendation || '',
      })),
    };

    return apiClient.post<ApiGameResult>('/api/results/', payload, { requiresAuth: true });
  },

  async saveResultAnonymous(
    results: GameResults,
    choices: GameChoice[],
    startedAt: number
  ): Promise<ApiGameResult> {
    const payload: SaveResultPayload = {
      nird_score: results.overallScore,
      total_points: results.totalPoints,
      inclusion_score: results.pillarScores.inclusion,
      responsabilite_score: results.pillarScores.responsabilite,
      durabilite_score: results.pillarScores.durabilite,
      total_savings_euros: results.totalSavingsEuros,
      total_savings_co2: results.totalSavingsCo2,
      cards_played: results.totalCards,
      correct_choices: results.correctChoices,
      started_at: new Date(startedAt).toISOString(),
      choices: choices.map((c) => ({
        card_id: c.cardId,
        card_name: c.cardName,
        card_type: c.cardType,
        accepted: c.accepted,
        points_earned: c.pointsEarned,
        timestamp: new Date(c.timestamp).toISOString(),
      })),
      wrong_answers: results.wrongAnswers.map((w: WrongAnswer) => ({
        card_id: w.cardId,
        card_name: w.cardName,
        card_type: w.cardType,
        alternative_name: w.alternative?.name || w.alternativeName || '',
        reason: w.explanation || w.reason || '',
        recommendation: w.correctAction || w.recommendation || '',
      })),
    };

    return apiClient.post<ApiGameResult>('/api/results/', payload);
  },

  async getResults(): Promise<ApiGameResult[]> {
    return apiClient.get<ApiGameResult[]>('/api/results/', { requiresAuth: true });
  },

  async getResult(id: number): Promise<ApiGameResult> {
    return apiClient.get<ApiGameResult>(`/api/results/${id}/`, { requiresAuth: true });
  },
};
