"use client"

import { useState, useEffect } from "react"
import type { Expense, Pool, Participant, Balance, ExpenseSummary, Contribution } from "@/types/expense"

export function useExpenses(eventId?: string) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [pools, setPools] = useState<Pool[]>([])
  const [participants, setParticipants] = useState<Participant[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Simuler le chargement des données
  useEffect(() => {
    // Dans une application réelle, ces données viendraient d'une API
    const mockParticipants: Participant[] = [
      { id: "1", name: "Alice", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "2", name: "Bob", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "3", name: "Charlie", avatar: "/placeholder.svg?height=40&width=40" },
      { id: "4", name: "David", avatar: "/placeholder.svg?height=40&width=40" },
    ]

    const mockExpenses: Expense[] = [
      {
        id: "1",
        description: "Dîner au restaurant",
        amount: 120,
        paidBy: "1",
        paidFor: ["1", "2", "3", "4"],
        date: new Date(2023, 5, 15),
        category: "food",
        eventId: eventId || "event1",
      },
      {
        id: "2",
        description: "Tickets de cinéma",
        amount: 40,
        paidBy: "2",
        paidFor: ["1", "2"],
        date: new Date(2023, 5, 16),
        category: "activity",
        eventId: eventId || "event1",
      },
      {
        id: "3",
        description: "Cadeau d'anniversaire",
        amount: 50,
        paidBy: "3",
        paidFor: ["1", "2", "3", "4"],
        date: new Date(2023, 5, 17),
        category: "gift",
        eventId: eventId || "event1",
      },
    ]

    const mockPools: Pool[] = [
      {
        id: "1",
        name: "Cadeau d'anniversaire pour Marie",
        description: "Pour acheter un cadeau d'anniversaire pour Marie",
        targetAmount: 100,
        currentAmount: 75,
        eventId: eventId || "event1",
        participants: mockParticipants,
        contributions: [
          {
            id: "1",
            participantId: "1",
            amount: 25,
            date: new Date(2023, 5, 10),
            message: "Bon anniversaire !",
          },
          {
            id: "2",
            participantId: "2",
            amount: 25,
            date: new Date(2023, 5, 11),
          },
          {
            id: "3",
            participantId: "3",
            amount: 25,
            date: new Date(2023, 5, 12),
            message: "Joyeux anniversaire !",
          },
        ],
        createdAt: new Date(2023, 5, 1),
        deadline: new Date(2023, 5, 20),
      },
    ]

    setParticipants(mockParticipants)
    setExpenses(mockExpenses)
    setPools(mockPools)
    setIsLoading(false)
  }, [eventId])

  // Ajouter une dépense
  const addExpense = (expense: Omit<Expense, "id" | "date">) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      date: new Date(),
    }
    setExpenses([...expenses, newExpense])
    return newExpense
  }

  // Ajouter une contribution à une cagnotte
  const addContribution = (poolId: string, contribution: Omit<Contribution, "id" | "date">) => {
    const newContribution: Contribution = {
      ...contribution,
      id: Date.now().toString(),
      date: new Date(),
    }

    setPools(
      pools.map((pool) => {
        if (pool.id === poolId) {
          const newCurrentAmount = pool.currentAmount + contribution.amount
          return {
            ...pool,
            currentAmount: newCurrentAmount,
            contributions: [...pool.contributions, newContribution],
          }
        }
        return pool
      }),
    )

    return newContribution
  }

  // Créer une nouvelle cagnotte
  const createPool = (pool: Omit<Pool, "id" | "createdAt" | "currentAmount" | "contributions">) => {
    const newPool: Pool = {
      ...pool,
      id: Date.now().toString(),
      createdAt: new Date(),
      currentAmount: 0,
      contributions: [],
    }
    setPools([...pools, newPool])
    return newPool
  }

  // Calculer les soldes (qui doit quoi à qui)
  const calculateBalances = (): Balance[] => {
    const balances: Record<string, number> = {}

    // Initialiser les soldes à 0
    participants.forEach((participant) => {
      balances[participant.id] = 0
    })

    // Calculer les soldes en fonction des dépenses
    expenses.forEach((expense) => {
      const paidBy = expense.paidBy
      const paidFor = expense.paidFor
      const amountPerPerson = expense.amount / paidFor.length

      // La personne qui a payé reçoit de l'argent
      balances[paidBy] += expense.amount

      // Les personnes pour qui la dépense a été faite doivent de l'argent
      paidFor.forEach((personId) => {
        balances[personId] -= amountPerPerson
      })
    })

    // Convertir en tableau de Balance
    return Object.entries(balances).map(([participantId, amount]) => ({
      participantId,
      amount: Number.parseFloat(amount.toFixed(2)),
    }))
  }

  // Obtenir un résumé des dépenses
  const getExpenseSummary = (): ExpenseSummary => {
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)

    const expensesByCategory: Record<string, number> = {}
    expenses.forEach((expense) => {
      if (!expensesByCategory[expense.category]) {
        expensesByCategory[expense.category] = 0
      }
      expensesByCategory[expense.category] += expense.amount
    })

    return {
      totalAmount,
      expensesByCategory: expensesByCategory as Record<any, number>,
      balances: calculateBalances(),
    }
  }

  return {
    expenses,
    pools,
    participants,
    isLoading,
    addExpense,
    addContribution,
    createPool,
    calculateBalances,
    getExpenseSummary,
  }
}
