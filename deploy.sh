#!/bin/bash

# Script de déploiement optimisé pour Next.js sur Vercel

# 1. Vérifier les erreurs de lint
echo "Vérification des erreurs de lint..."
npm run lint

# 2. Vérifier les types TypeScript
echo "Vérification des types TypeScript..."
npm run type-check

# 3. Exécuter les tests
echo "Exécution des tests..."
npm run test

# 4. Construire l'application
echo "Construction de l'application..."
npm run build

# 5. Déployer sur Vercel
echo "Déploiement sur Vercel..."
vercel --prod

echo "Déploiement terminé!"
