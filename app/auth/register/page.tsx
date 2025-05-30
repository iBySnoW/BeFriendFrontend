import { AuthForm } from '@/components/auth/AuthForm';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Inscription | BeFriend',
  description: 'Créez votre compte BeFriend',
};

export default function RegisterPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen wireframe-gradient">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Rejoignez BeFriend</h1>
          <p className="mt-2 text-sm text-gray-600">
            Créez votre compte pour commencer à partager vos dépenses
          </p>
        </div>

        <AuthForm mode="register" />

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Déjà un compte ?{' '}
            <Link
              href="/auth/login"
              className="font-medium text-primary hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
