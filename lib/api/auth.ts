import { apiRequest } from './client';
import type { AuthResponse, LoginCredentials, RegisterCredentials } from '@/types/auth';

export const authApi = {
  /**
   * Enregistre un nouvel utilisateur (public)
   */
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  /**
   * Connecte un utilisateur existant (via Next.js API route pour gérer les cookies)
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  /**
   * Déconnecte l'utilisateur actuel (protégé)
   */
  logout: async (): Promise<void> => {
    return apiRequest<void>('/auth/logout', { method: 'POST' });
  },

  /**
   * Récupère les informations de l'utilisateur connecté (protégé)
   */
  getCurrentUser: async (): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>('/auth/me');
  },

  /**
   * Récupère les informations d'un utilisateur par son ID (protégé)
   */
  getUserById: async (userId: number): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>(`/users/${userId}`);
  },

  /**
   * Récupère les informations d'un utilisateur par son email (protégé)
   */
  getUserByEmail: async (email: string): Promise<AuthResponse> => {
    return apiRequest<AuthResponse>(`/users/email/${email}`);
  },
}; 