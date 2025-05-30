import Link from "next/link"
import { Users } from "lucide-react"
import { Card } from "@/components/ui/card"

interface GroupCardProps {
  group: {
    id: number
    name: string
    members: number
    color: string
  }
}

export function GroupCard({ group }: GroupCardProps) {
  return (
    <Link href={`/groups/${group.id}`}>
      <Card className="rounded-xl shadow-md bg-card hover:scale-105 transition">
        <div className="befriend-card flex flex-col items-center p-4">
        <div className={`w-16 h-16 rounded-full ${group.color} flex items-center justify-center mb-3`}>
          <Users className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-medium text-center font-fredoka">{group.name}</h3>
        <p className="text-xs text-muted-foreground mt-1">{group.members} membres</p>
      </div>
      </Card>
    </Link>
  )
}
