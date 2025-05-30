export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: "Le mot de passe doit contenir au moins 8 caractères" }
  }

  // Vérifier si le mot de passe contient au moins un chiffre
  if (!/\d/.test(password)) {
    return { valid: false, message: "Le mot de passe doit contenir au moins un chiffre" }
  }

  // Vérifier si le mot de passe contient au moins une lettre
  if (!/[a-zA-Z]/.test(password)) {
    return { valid: false, message: "Le mot de passe doit contenir au moins une lettre" }
  }

  return { valid: true }
}

export function validateUsername(username: string): { valid: boolean; message?: string } {
  if (username.length < 3) {
    return { valid: false, message: "Le nom d'utilisateur doit contenir au moins 3 caractères" }
  }

  // Vérifier si le nom d'utilisateur contient uniquement des caractères alphanumériques et des tirets
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return {
      valid: false,
      message: "Le nom d'utilisateur ne peut contenir que des lettres, des chiffres, des tirets et des underscores",
    }
  }

  return { valid: true }
}

export function validateEventDates(startDate: Date, endDate?: Date): { valid: boolean; message?: string } {
  const now = new Date()

  // Vérifier si la date de début est dans le futur
  if (startDate < now) {
    return { valid: false, message: "La date de début doit être dans le futur" }
  }

  // Vérifier si la date de fin est après la date de début
  if (endDate && endDate < startDate) {
    return { valid: false, message: "La date de fin doit être après la date de début" }
  }

  return { valid: true }
}

export function validateAmount(amount: number): { valid: boolean; message?: string } {
  if (isNaN(amount) || amount <= 0) {
    return { valid: false, message: "Le montant doit être un nombre positif" }
  }

  return { valid: true }
}

export function validateExpenseShares(
  totalAmount: number,
  shares: { userId: number; shareAmount: number }[],
): { valid: boolean; message?: string } {
  // Vérifier si la liste des parts est vide
  if (shares.length === 0) {
    return { valid: false, message: "La liste des participants ne peut pas être vide" }
  }

  // Calculer la somme des parts
  const totalShares = shares.reduce((sum, share) => sum + share.shareAmount, 0)

  // Vérifier si la somme des parts est égale au montant total (avec une petite marge d'erreur pour les arrondis)
  if (Math.abs(totalShares - totalAmount) > 0.01) {
    return {
      valid: false,
      message: `La somme des parts (${totalShares.toFixed(2)} €) doit être égale au montant total (${totalAmount.toFixed(2)} €)`,
    }
  }

  return { valid: true }
}
