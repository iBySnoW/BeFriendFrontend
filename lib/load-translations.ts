// Utilitaire pour charger les traductions de manière sécurisée
export async function loadTranslations(locale = "fr") {
  try {
    // Essayer de charger depuis le dossier public
    const response = await fetch(`/t.json`)
    if (response.ok) {
      return await response.json()
    }

    // Fallback sur un objet vide structuré
    return {
      common: {},
      errors: {},
    }
  } catch (error) {
    console.error("Erreur lors du chargement des traductions:", error)
    // Retourner un objet vide en cas d'erreur
    return {
      common: {},
      errors: {},
    }
  }
}
