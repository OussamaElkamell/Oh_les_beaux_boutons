import { apiClient } from './api';
import { TechnologyCard } from '@/types/game';

interface ApiCard {
  id: number;
  card_id: string;
  name: string;
  card_type: 'big-tech' | 'nird';
  category_name?: string;
  category?: { name: string };
  description: string;
  icon: string;
  pillar: 'inclusion' | 'responsabilite' | 'durabilite';
  stats?: {
    cost: string;
    co2: string;
    dataLocation: string;
  };
  cost?: string;
  co2?: string;
  co2_impact?: string;
  data_location?: string;
  alternative_id?: string;
  alternative?: number;
  savings?: {
    euros?: number;
    co2Kg?: number;
  };
  savings_euros?: number;
  savings_co2?: number;
  savings_co2_kg?: number;
}

function mapApiCard(card: ApiCard): TechnologyCard {
  const category = card.category_name || card.category?.name || 'Général';
  
  const stats = card.stats || {
    cost: card.cost || 'N/A',
    co2: card.co2 || card.co2_impact || 'N/A',
    dataLocation: card.data_location || 'N/A',
  };

  let savings: { euros?: number; co2Kg?: number } | undefined;
  if (card.savings) {
    savings = card.savings;
  } else if (card.savings_euros || card.savings_co2 || card.savings_co2_kg) {
    savings = {
      euros: card.savings_euros,
      co2Kg: card.savings_co2 || card.savings_co2_kg,
    };
  }

  return {
    id: card.card_id || card.id.toString(),
    name: card.name,
    type: card.card_type,
    category,
    description: card.description,
    icon: card.icon,
    pillar: card.pillar,
    stats,
    alternativeId: card.alternative_id || card.alternative?.toString(),
    savings,
  };
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export const cardsApi = {
  async getCards(): Promise<TechnologyCard[]> {
    const cards = await apiClient.get<ApiCard[]>('/api/cards/');
    return cards.map(mapApiCard);
  },

  async getRandomCards(count: number = 15): Promise<TechnologyCard[]> {
    const cards = await apiClient.get<ApiCard[]>(`/api/cards/random/?count=${count}`);
    return cards.map(mapApiCard);
  },

  async getCardsByCategory(category: string): Promise<TechnologyCard[]> {
    const cards = await apiClient.get<ApiCard[]>(`/api/cards/by_category/?category=${encodeURIComponent(category)}`);
    return cards.map(mapApiCard);
  },

  async getCardsByPillar(pillar: string): Promise<TechnologyCard[]> {
    const cards = await apiClient.get<ApiCard[]>(`/api/cards/by_pillar/?pillar=${pillar}`);
    return cards.map(mapApiCard);
  },

  async getCategories(): Promise<Category[]> {
    return apiClient.get<Category[]>('/api/cards/categories/');
  },
};
