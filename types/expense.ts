export interface Participant {
  id: string
  name: string
  avatar?: string
}

export interface Expense {
  id: string
  description: string
  amount: number
  paidBy: string // ID du participant
  paidFor: string[] // IDs des participants concernés
  date: Date
  category: ExpenseCategory
  eventId?: string
  receipt?: string // URL de l'image du reçu
}

export interface Balance {
  user_id: number;
  user_name: string;
  balance: number; // Positif = doit recevoir, Négatif = doit payer
}

export type ExpenseCategory = "food" | "transport" | "accommodation" | "activity" | "gift" | "other"

export interface Pool {
  id: string
  name: string
  description?: string
  targetAmount?: number
  currentAmount: number
  eventId?: string
  participants: Participant[]
  contributions: Contribution[]
  createdAt: Date
  deadline?: Date
}

export interface Contribution {
  id: string
  participantId: string
  amount: number
  date: Date
  message?: string
}

export interface ExpenseSummary {
  totalAmount: number
  expensesByCategory: Record<ExpenseCategory, number>
  balances: Balance[]
}
