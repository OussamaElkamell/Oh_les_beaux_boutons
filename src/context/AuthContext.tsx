import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '@/services/authApi';
import { UserProfile, RegisterData } from '@/types/game';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    if (!authApi.isAuthenticated()) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const profile = await authApi.getProfile();
      setUser(profile);
    } catch {
      authApi.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    await authApi.login(email, password);
    await refreshUser();
  };

  const register = async (data: RegisterData) => {
    await authApi.register(data);
    // Auto-login after registration
    await authApi.login(data.email, data.password);
    await refreshUser();
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
