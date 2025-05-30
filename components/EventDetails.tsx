"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Wallet, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Expense {
  id: string
  description: string
  amount: number
  paidBy: string
  splitBetween: string[]
}

export function EventDetails() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      description: "Boissons",
      amount: 25.5,
      paidBy: "John Doe",
      splitBetween: ["John Doe", "Alice Smith", "Bob Johnson"],
    },
  ])

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="space-y-6">
      <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
        <img src="/placeholder.svg" alt="Event cover" className="w-full h-full object-cover" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div>
            <p className="font-medium">15 février</p>
            <p className="text-sm text-gray-500">14:00 - 18:00</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-gray-400" />
          <div>
            <p className="font-medium">ECV Digital</p>
            <p className="text-sm text-gray-500">15 Rue Deshoulières, 44000 Nantes</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-gray-400" />
          <div>
            <p className="font-medium">12 participants</p>
            <div className="flex -space-x-2 mt-1">
              {[...Array(4)].map((_, i) => (
                <Avatar key={i} className="border-2 border-background w-8 h-8">
                  <AvatarImage src={`/placeholder.svg`} />
                  <AvatarFallback>U{i + 1}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Cagnotte
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter une dépense</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" placeholder="Ex: Boissons" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Montant</Label>
                    <Input id="amount" type="number" placeholder="0.00" />
                  </div>
                  <Button className="w-full">Ajouter la dépense</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-2">
            {expenses.map((expense) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div>
                  <p className="font-medium">{expense.description}</p>
                  <p className="text-sm text-gray-500">Payé par {expense.paidBy}</p>
                </div>
                <p className="font-medium">{expense.amount.toFixed(2)}€</p>
              </motion.div>
            ))}
          </div>

          <div className="pt-2 flex justify-between items-center font-medium">
            <span>Total</span>
            <span>{totalAmount.toFixed(2)}€</span>
          </div>
        </div>
      </div>
    </div>
  )
}
