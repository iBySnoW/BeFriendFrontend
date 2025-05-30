"use client"

import type { Pool, Participant } from "@/types/expense"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Gift, Calendar, TrendingUp } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface PoolListProps {
  pools: Pool[]
  participants: Participant[]
  onAddPool?: () => void
  onContribute?: (poolId: string) => void
}

export function PoolList({ pools, participants, onAddPool, onContribute }: PoolListProps) {
  const getParticipantById = (id: string) => {
    return participants.find((p) => p.id === id) || { id, name: "Inconnu" }
  }

  const getProgressPercentage = (pool: Pool) => {
    if (!pool.targetAmount) return 100
    return Math.min(100, (pool.currentAmount / pool.targetAmount) * 100)
  }

  return (
    <div className="space-y-4">
      {pools.length === 0 ? (
        <div className="text-center py-8 wireframe-card">
          <Gift className="h-12 w-12 text-white/40 mx-auto mb-3" />
          <p className="text-white/60">Aucune cagnotte créée</p>
          {onAddPool && (
            <Button onClick={onAddPool} className="mt-4 wireframe-button">
              Créer une cagnotte
            </Button>
          )}
        </div>
      ) : (
        <>
          {pools.map((pool) => (
            <Dialog key={pool.id}>
              <DialogTrigger asChild>
                <Card className="wireframe-card hover:bg-white/15 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                          <Gift className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{pool.name}</h3>
                          <div className="flex items-center text-sm text-white/60">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Créée le {formatDate(pool.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Progression</span>
                        <span className="text-white font-medium">
                          {formatCurrency(pool.currentAmount)}
                          {pool.targetAmount ? ` / ${formatCurrency(pool.targetAmount)}` : ""}
                        </span>
                      </div>
                      <Progress
                        value={getProgressPercentage(pool)}
                        className="h-2 bg-white/10"
                        indicatorClassName="bg-white"
                      />
                    </div>

                    <div className="mt-3 flex justify-between items-center">
                      <div className="flex -space-x-2">
                        {pool.contributions.slice(0, 3).map((contribution, index) => {
                          const participant = getParticipantById(contribution.participantId)
                          return (
                            <Avatar key={index} className="border-2 border-primary-700 h-8 w-8">
                              <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-white/20 text-white">
                                {participant.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          )
                        })}
                        {pool.contributions.length > 3 && (
                          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center border-2 border-primary-700 text-white text-xs">
                            +{pool.contributions.length - 3}
                          </div>
                        )}
                      </div>
                      {pool.deadline && (
                        <div className="text-xs text-white/60">
                          {new Date(pool.deadline) > new Date() ? (
                            <span>Expire le {formatDate(pool.deadline)}</span>
                          ) : (
                            <span className="text-red-400">Expirée</span>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="wireframe-gradient border-white/20">
                <DialogHeader>
                  <DialogTitle className="text-white">Détails de la cagnotte</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-3">
                        <Gift className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white text-lg">{pool.name}</h3>
                        <p className="text-white/60">Créée le {formatDate(pool.createdAt)}</p>
                      </div>
                    </div>
                  </div>

                  {pool.description && (
                    <div className="wireframe-card p-4">
                      <p className="text-white">{pool.description}</p>
                    </div>
                  )}

                  <div className="wireframe-card p-4">
                    <h4 className="font-medium text-white mb-2">Montant collecté</h4>
                    <div className="flex items-end justify-between mb-2">
                      <p className="text-2xl font-bold text-white">{formatCurrency(pool.currentAmount)}</p>
                      {pool.targetAmount && <p className="text-white/60">sur {formatCurrency(pool.targetAmount)}</p>}
                    </div>
                    <Progress
                      value={getProgressPercentage(pool)}
                      className="h-3 bg-white/10"
                      indicatorClassName="bg-white"
                    />
                    {pool.targetAmount && (
                      <p className="text-sm text-white/60 mt-2">
                        {getProgressPercentage(pool).toFixed(0)}% de l'objectif atteint
                      </p>
                    )}
                  </div>

                  <div className="wireframe-card p-4">
                    <h4 className="font-medium text-white mb-3">Contributions</h4>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {pool.contributions.map((contribution, index) => {
                        const participant = getParticipantById(contribution.participantId)
                        return (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-white/20 text-white">
                                  {participant.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-white">{participant.name}</p>
                                <p className="text-xs text-white/60">{formatDate(contribution.date)}</p>
                              </div>
                            </div>
                            <p className="font-medium text-white">{formatCurrency(contribution.amount)}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {onContribute && (
                    <Button className="w-full wireframe-button" onClick={() => onContribute(pool.id)}>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Contribuer
                    </Button>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </>
      )}
    </div>
  )
}
