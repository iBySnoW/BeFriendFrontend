export interface User {
  id: number;
  email: string;
  full_name: string;
  username: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  full_name: string;
  username: string;
}

export interface AuthError {
  message: string;
  statusCode?: number;
} 