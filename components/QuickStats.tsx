import { Card, CardContent } from "@/components/ui/card"

interface QuickStatsProps {
  groups: any[]
  events: any[]
}

export function QuickStats({ groups, events }: QuickStatsProps) {
  return (
    <section>
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold font-fredoka mb-4">Statistiques rapides</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{groups.length}</p>
              <p className="text-sm text-muted-foreground">Groupes</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{events.length}</p>
              <p className="text-sm text-muted-foreground">Événements</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{groups.reduce((acc, group) => acc + group.members, 0)}</p>
              <p className="text-sm text-muted-foreground">Membres</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
