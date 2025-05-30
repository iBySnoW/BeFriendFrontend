"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const initialActivities = [
  {
    id: 1,
    type: "message",
    user: "Alice",
    group: "Famille",
    content: "J'ai ajouté des photos de notre dernier repas !",
  },
  { id: 2, type: "event", user: "Bob", group: "Amis proches", content: "a créé l'événement 'Soirée cinéma'" },
  { id: 3, type: "join", user: "Charlie", group: "Club de sport", content: "a rejoint le groupe" },
]

export function ActivityFeed() {
  const [activities, setActivities] = useState(initialActivities)

  return (
    <section>
      <h2 className="text-2xl font-semibold font-fredoka mb-4">Activité récente</h2>
      <Card>
        <CardContent className="p-4 space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>{activity.user[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p>
                  <span className="font-semibold">{activity.user}</span> {activity.content}
                </p>
                <p className="text-sm text-muted-foreground">{activity.group}</p>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}
