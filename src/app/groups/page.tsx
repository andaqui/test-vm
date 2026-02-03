"use client"

import Link from 'next/link'
import { useApp } from '@/context/AppContext'
import { getAllGroups } from '@/data/matches'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

export default function GroupsPage() {
  const { selectedTeam, hideOtherTeams, isTeamHighlighted } = useApp()
  const groups = getAllGroups()

  // Filter groups if hideOtherTeams is enabled
  const filteredGroups = hideOtherTeams && selectedTeam
    ? groups.filter(g => g.standings.some(s => s.team.id === selectedTeam.id))
    : groups

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Grupper & Tabeller</h1>
        <p className="text-muted-foreground mt-2">
          Alla VM-grupper (A-L) med aktuella tabeller
        </p>
      </div>

      {/* Mobile: Accordion view */}
      <div className="md:hidden">
        <Accordion type="single" collapsible className="space-y-2">
          {filteredGroups.map(group => (
            <AccordionItem
              key={group.name}
              value={group.name}
              className="border rounded-lg px-4"
            >
              <AccordionTrigger className="text-lg font-semibold">
                Grupp {group.name}
              </AccordionTrigger>
              <AccordionContent>
                <GroupTable group={group} isTeamHighlighted={isTeamHighlighted} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Desktop: Grid view */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredGroups.map(group => (
          <Card key={group.name}>
            <CardHeader className="pb-3">
              <CardTitle>Grupp {group.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <GroupTable group={group} isTeamHighlighted={isTeamHighlighted} />
            </CardContent>
          </Card>
        ))}
      </div>

      {hideOtherTeams && selectedTeam && filteredGroups.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          Inga grupper att visa. Avaktivera &quot;Göm andra landslag&quot; för att se alla grupper.
        </p>
      )}
    </div>
  )
}

function GroupTable({
  group,
  isTeamHighlighted,
}: {
  group: ReturnType<typeof getAllGroups>[0]
  isTeamHighlighted: (teamId: string) => boolean
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 font-medium">#</th>
            <th className="text-left py-2 font-medium">Lag</th>
            <th className="text-center py-2 font-medium">S</th>
            <th className="text-center py-2 font-medium">MS</th>
            <th className="text-center py-2 font-medium">P</th>
          </tr>
        </thead>
        <tbody>
          {group.standings.map((standing, index) => (
            <tr
              key={standing.team.id}
              className={cn(
                'border-b last:border-b-0',
                isTeamHighlighted(standing.team.id) && 'bg-accent ring-2 ring-primary rounded',
                index < 2 && 'bg-green-50 dark:bg-green-950/20'
              )}
            >
              <td className="py-2 font-medium">{index + 1}</td>
              <td className="py-2">
                <Link
                  href={`/teams/${standing.team.slug}`}
                  className="flex items-center gap-2 hover:underline"
                >
                  <span>{standing.team.flag}</span>
                  <span className="font-medium">{standing.team.name}</span>
                </Link>
              </td>
              <td className="text-center py-2">{standing.played}</td>
              <td className="text-center py-2">
                {standing.goalDifference > 0 ? '+' : ''}{standing.goalDifference}
              </td>
              <td className="text-center py-2 font-bold">{standing.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-muted-foreground mt-2">
        S = Spelade, MS = Målskillnad, P = Poäng
      </p>
    </div>
  )
}
