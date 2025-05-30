import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fonction pour formater les montants
export function formatCurrency(amount: number, currency = "€"): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency === "€" ? "EUR" : currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

// Fonction pour formater les dates
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

// Fonction pour déterminer si une couleur est claire ou foncée
export function isLightColor(hexColor: string): boolean {
  // Convertir le code hexadécimal en RGB
  const r = Number.parseInt(hexColor.slice(1, 3), 16)
  const g = Number.parseInt(hexColor.slice(3, 5), 16)
  const b = Number.parseInt(hexColor.slice(5, 7), 16)

  // Calculer la luminosité (formule standard)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Si la luminance est supérieure à 0.5, la couleur est considérée comme claire
  return luminance > 0.5
}

// Fonction pour obtenir la couleur de texte appropriée en fonction de la couleur de fond
export function getContrastTextColor(backgroundColor: string): string {
  return isLightColor(backgroundColor) ? "text-slate-800" : "text-white"
}
