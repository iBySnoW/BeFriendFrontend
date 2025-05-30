import { AuthError } from '@/types/auth';

// Configuration de l'API
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Fonction utilitaire pour gérer les erreurs
export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error: AuthError = await response.json().catch(() => ({
      message: 'Une erreur est survenue',
    }));
    throw new Error(error.message || 'Une erreur est survenue');
  }
  return response.json();
}

// Fonction utilitaire pour les requêtes API
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  
  const token = document.cookie
  .split('; ')
  .find(row => row.startsWith('token='))
  ?.split('=')[1];

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  return handleResponse<T>(response);
}

// Fonction utilitaire pour ajouter le token aux requêtes
export function getAuthHeaders(token?: string): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}