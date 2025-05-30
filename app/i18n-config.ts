// Configuration d'internationalisation
import { translationsData } from "../lib/translation-utils"

export const i18nConfig = {
  defaultLocale: "fr",
  locales: ["fr", "en"],
  translations: translationsData,
}

// Ne pas utiliser t.json comme une fonction
export const getTranslations = () => {
  return translationsData
}
