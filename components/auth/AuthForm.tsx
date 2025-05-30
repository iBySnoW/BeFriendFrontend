"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import type { LoginCredentials, RegisterCredentials } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSuccess?: () => void;
}

export function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const router = useRouter();
  const { login, register, isLoading, error } = useAuth();
  const [formData, setFormData] = useState<LoginCredentials | RegisterCredentials>({
    email: '',
    password: '',
    ...(mode === 'register' ? { full_name: '', username: '' } : {}),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        await login(formData as LoginCredentials);
        onSuccess?.();
      } else {
        await register(formData as RegisterCredentials);
        // Redirection vers la page de login après une inscription réussie
        router.push('/auth/login');
      }
    } catch (err) {
      // L'erreur est déjà gérée par le hook useAuth
      console.error(`${mode === 'login' ? 'Connexion' : 'Inscription'} échouée`);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{mode === 'login' ? 'Connexion' : 'Inscription'}</CardTitle>
        <CardDescription>
          {mode === 'login'
            ? 'Connectez-vous à votre compte BeFriend'
            : 'Créez votre compte BeFriend'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {mode === 'register' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="full_name">Nom complet</Label>
                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required
                  value={(formData as RegisterCredentials).full_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Nom d'utilisateur</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={(formData as RegisterCredentials).username}
                  onChange={handleChange}
                  placeholder="johndoe"
                />
              </div>
            </>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading
              ? mode === 'login'
                ? 'Connexion en cours...'
                : 'Inscription en cours...'
              : mode === 'login'
              ? 'Se connecter'
              : "S'inscrire"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 