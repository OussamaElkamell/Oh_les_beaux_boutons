import { apiClient } from './api';
import { UserProfile, RegisterData } from '@/types/game';

interface LoginResponse {
  access: string;
  refresh: string;
}

export const authApi = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/api/auth/token/', {
      email: email, // Django JWT uses username field
      password,
    });
    apiClient.setTokens(response.access, response.refresh);
    return response;
  },

  async register(data: RegisterData): Promise<UserProfile> {
    return apiClient.post<UserProfile>('/api/users/register/', data);
  },

  async getProfile(): Promise<UserProfile> {
    return apiClient.get<UserProfile>('/api/users/profile/', { requiresAuth: true });
  },

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    return apiClient.put<UserProfile>('/api/users/profile/', data, { requiresAuth: true });
  },

  logout() {
    apiClient.clearTokens();
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  },
};
