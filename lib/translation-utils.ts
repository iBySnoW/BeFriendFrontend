// Utilitaire de traduction
import translations from "../public/t.json"

// Fonction de traduction
export function t(key: string, params?: Record<string, string | number>): string {
  // Diviser la clé par les points pour accéder aux propriétés imbriquées
  const keys = key.split(".")

  // Récupérer la valeur à partir de l'objet de traductions
  const value = keys.reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : undefined), translations as any)

  // Si la valeur n'est pas trouvée, retourner la clé
  if (value === undefined) {
    return key
  }

  // Si des paramètres sont fournis, remplacer les placeholders
  if (params) {
    return Object.entries(params).reduce((str, [paramKey, paramValue]) => {
      return str.replace(new RegExp(`{{${paramKey}}}`, "g"), String(paramValue))
    }, value as string)
  }

  return value as string
}

// Fonction pour vérifier si une traduction existe
export function hasTranslation(key: string): boolean {
  const keys = key.split(".")
  return keys.reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : undefined), translations as any) !== undefined
}

// Exporter l'objet de traductions pour référence
export const translationsData = translations
