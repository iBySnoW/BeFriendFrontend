import { useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/auth';
import type { User, LoginCredentials, RegisterCredentials } from '@/types/auth';

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

// Fonction pour vérifier l'état de l'authentification côté serveur
async function checkAuthStatus() {
  try {
    const response = await fetch('/api/auth/me');
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch {
    return null;
  }
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Vérifier l'état de l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await checkAuthStatus();
        setUser(response?.user || null);
      } catch (err) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Fonction de connexion
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await authApi.login(credentials);
      setUser(response.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fonction d'enregistrement
  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await authApi.register(credentials);
      setUser(response.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fonction de déconnexion
  const logout = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
  };
} 