"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"

type Group = {
  id: string
  name: string
  members: number
}

const initialGroups: Group[] = [
  { id: "1", name: "Famille", members: 5 },
  { id: "2", name: "Amis proches", members: 8 },
  { id: "3", name: "Collègues", members: 12 },
  { id: "4", name: "Club de sport", members: 20 },
]

export function DraggableGroupList() {
  const [groups, setGroups] = useState(initialGroups)

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(groups)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setGroups(items)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="groups">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
            {groups.map((group, index) => (
              <Draggable key={group.id} draggableId={group.id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Card>
                      <CardContent className="flex items-center p-4">
                        <Users className="h-5 w-5 text-primary mr-3" />
                        <div>
                          <h3 className="font-semibold">{group.name}</h3>
                          <p className="text-sm text-muted-foreground">{group.members} membres</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
