"use client"

import { useState, useMemo, useCallback, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, RotateCcw } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { teams, getTeamById, groupNames, getDefaultGroupOrder } from '@/data/teams'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Playoff bracket structure for 48-team World Cup
// Top 2 from each group (24) + 8 best third-placed teams = 32 teams
// Round of 32 -> Round of 16 -> Quarter -> Semi -> Final
const playoffStructure = {
  round_of_32: [
    { id: 'r32-1', home: '1A', away: '3C' },
    { id: 'r32-2', home: '2B', away: '2C' },
    { id: 'r32-3', home: '1B', away: '3A' },
    { id: 'r32-4', home: '2A', away: '2D' },
    { id: 'r32-5', home: '1C', away: '3B' },
    { id: 'r32-6', home: '2E', away: '2F' },
    { id: 'r32-7', home: '1D', away: '3E' },
    { id: 'r32-8', home: '2G', away: '2H' },
    { id: 'r32-9', home: '1E', away: '3D' },
    { id: 'r32-10', home: '2I', away: '2J' },
    { id: 'r32-11', home: '1F', away: '3G' },
    { id: 'r32-12', home: '2K', away: '2L' },
    { id: 'r32-13', home: '1G', away: '3F' },
    { id: 'r32-14', home: '1H', away: '3I' },
    { id: 'r32-15', home: '1I', away: '3H' },
    { id: 'r32-16', home: '1J', away: '3J' },
  ],
  round_of_16: [
    { id: 'r16-1', home: 'r32-1', away: 'r32-2' },
    { id: 'r16-2', home: 'r32-3', away: 'r32-4' },
    { id: 'r16-3', home: 'r32-5', away: 'r32-6' },
    { id: 'r16-4', home: 'r32-7', away: 'r32-8' },
    { id: 'r16-5', home: 'r32-9', away: 'r32-10' },
    { id: 'r16-6', home: 'r32-11', away: 'r32-12' },
    { id: 'r16-7', home: 'r32-13', away: 'r32-14' },
    { id: 'r16-8', home: 'r32-15', away: 'r32-16' },
  ],
  quarter: [
    { id: 'qf-1', home: 'r16-1', away: 'r16-2' },
    { id: 'qf-2', home: 'r16-3', away: 'r16-4' },
    { id: 'qf-3', home: 'r16-5', away: 'r16-6' },
    { id: 'qf-4', home: 'r16-7', away: 'r16-8' },
  ],
  semi: [
    { id: 'sf-1', home: 'qf-1', away: 'qf-2' },
    { id: 'sf-2', home: 'qf-3', away: 'qf-4' },
  ],
  final: [{ id: 'final', home: 'sf-1', away: 'sf-2' }],
}

export default function PredictionsPage() {
  const { predictions, updateGroupPrediction, updatePlayoffPrediction, setPredictions } = useApp()
  const [activeTab, setActiveTab] = useState('groups')

  // Initialize group predictions with default order if empty
  useEffect(() => {
    groupNames.forEach(groupName => {
      if (!predictions.groupPredictions[groupName] || predictions.groupPredictions[groupName].length === 0) {
        updateGroupPrediction(groupName, getDefaultGroupOrder(groupName))
      }
    })
  }, [])

  // Get team from group prediction (e.g., "1A" -> team at position 1 in group A)
  const getTeamFromGroupPosition = useCallback(
    (position: string): string | null => {
      const pos = parseInt(position[0]) - 1 // 0-indexed
      const group = position.slice(1)
      const groupPrediction = predictions.groupPredictions[group]
      if (!groupPrediction || !groupPrediction[pos]) return null
      return groupPrediction[pos]
    },
    [predictions.groupPredictions]
  )

  // Get team from playoff prediction (recursive)
  const getTeamFromPlayoff = useCallback(
    (matchId: string): string | null => {
      return predictions.playoffPredictions[matchId] || null
    },
    [predictions.playoffPredictions]
  )

  // Resolve a match slot (either group position or previous match winner)
  const resolveMatchSlot = useCallback(
    (slot: string): string | null => {
      if (slot.match(/^\d[A-L]$/)) {
        return getTeamFromGroupPosition(slot)
      }
      return getTeamFromPlayoff(slot)
    },
    [getTeamFromGroupPosition, getTeamFromPlayoff]
  )

  // Calculate playoff bracket based on predictions
  const playoffBracket = useMemo(() => {
    const bracket: Record<
      string,
      Array<{
        id: string
        homeTeamId: string | null
        awayTeamId: string | null
        winnerId: string | null
      }>
    > = {}

    for (const [stage, matches] of Object.entries(playoffStructure)) {
      bracket[stage] = matches.map(match => ({
        id: match.id,
        homeTeamId: resolveMatchSlot(match.home),
        awayTeamId: resolveMatchSlot(match.away),
        winnerId: predictions.playoffPredictions[match.id] || null,
      }))
    }

    return bracket
  }, [predictions.playoffPredictions, resolveMatchSlot])

  // Check if all groups are complete (all have 4 teams)
  const allGroupsComplete = groupNames.every(
    g => predictions.groupPredictions[g]?.length === 4
  )

  // Get the predicted winner
  const predictedWinner = predictions.playoffPredictions['final']
    ? getTeamById(predictions.playoffPredictions['final'])
    : null

  // Reset all predictions to default
  const handleResetAll = () => {
    if (confirm('Är du säker på att du vill återställa alla predictions?')) {
      const defaultGroupPredictions: Record<string, string[]> = {}
      groupNames.forEach(g => {
        defaultGroupPredictions[g] = getDefaultGroupOrder(g)
      })
      setPredictions({
        groupPredictions: defaultGroupPredictions,
        playoffPredictions: {},
      })
    }
  }

  // Reset to default standings (keep current but reset to default order)
  const handleResetToStandings = () => {
    const defaultGroupPredictions: Record<string, string[]> = {}
    groupNames.forEach(g => {
      defaultGroupPredictions[g] = getDefaultGroupOrder(g)
    })
    setPredictions({
      groupPredictions: defaultGroupPredictions,
      playoffPredictions: predictions.playoffPredictions,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Predictions</h1>
          <p className="text-muted-foreground mt-2">
            Dra och släpp lagen för att ordna din tippning - sparas automatiskt
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResetToStandings}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Återställ ordning
          </Button>
          <Button variant="outline" onClick={handleResetAll}>
            Återställ alla
          </Button>
        </div>
      </div>

      {/* Winner Display */}
      {predictedWinner && (
        <Card className="bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/20 dark:to-yellow-800/10 border-yellow-300 dark:border-yellow-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Din VM-vinnare</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-5xl">{predictedWinner.flag}</span>
                <span className="text-2xl font-bold">{predictedWinner.name}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="groups">Gruppspel</TabsTrigger>
          <TabsTrigger value="playoffs" disabled={!allGroupsComplete}>
            Slutspel {!allGroupsComplete && '(fyll i grupper först)'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="groups" className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Dra och släpp lagen för att ändra placering (1-4) i varje grupp
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {groupNames.map(groupName => (
              <GroupPrediction
                key={groupName}
                groupName={groupName}
                currentPrediction={predictions.groupPredictions[groupName] || getDefaultGroupOrder(groupName)}
                onUpdate={updateGroupPrediction}
              />
            ))}
          </div>

          {allGroupsComplete && (
            <div className="text-center py-4">
              <p className="text-green-600 dark:text-green-400 font-medium">
                Alla grupper är ifyllda! Gå vidare till Slutspel.
              </p>
              <Button className="mt-2" onClick={() => setActiveTab('playoffs')}>
                Gå till Slutspel
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="playoffs" className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Klicka på det lag du tror vinner varje match
          </p>

          {/* Mobile: Stacked view */}
          <div className="lg:hidden space-y-6">
            {[
              { name: '32-delsfinal', key: 'round_of_32' },
              { name: 'Sextondelsfinal', key: 'round_of_16' },
              { name: 'Kvartsfinal', key: 'quarter' },
              { name: 'Semifinal', key: 'semi' },
              { name: 'Final', key: 'final' },
            ].map(stage => (
              <Card key={stage.key}>
                <CardHeader>
                  <CardTitle>{stage.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {playoffBracket[stage.key]?.map(match => (
                    <PlayoffMatchCard
                      key={match.id}
                      match={match}
                      onSelectWinner={updatePlayoffPrediction}
                    />
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop: Bracket view */}
          <div className="hidden lg:block overflow-x-auto">
            <div className="min-w-[1400px] flex gap-4 p-4">
              {[
                { name: '32-delsfinal', key: 'round_of_32' },
                { name: 'Sextondelsfinal', key: 'round_of_16' },
                { name: 'Kvartsfinal', key: 'quarter' },
                { name: 'Semifinal', key: 'semi' },
                { name: 'Final', key: 'final' },
              ].map((stage, stageIndex) => (
                <div key={stage.key} className="flex-1 min-w-[200px]">
                  <h3 className="text-sm font-semibold text-center mb-4 pb-2 border-b">
                    {stage.name}
                  </h3>
                  <div
                    className={cn(
                      'space-y-1',
                      stageIndex === 1 && 'space-y-4 pt-4',
                      stageIndex === 2 && 'space-y-12 pt-10',
                      stageIndex === 3 && 'space-y-32 pt-24',
                      stageIndex === 4 && 'pt-48'
                    )}
                  >
                    {playoffBracket[stage.key]?.map(match => (
                      <PlayoffMatchBracket
                        key={match.id}
                        match={match}
                        onSelectWinner={updatePlayoffPrediction}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function SortableTeamItem({
  id,
  position,
}: {
  id: string
  position: number
}) {
  const team = getTeamById(id)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (!team) return null

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-2 p-2 rounded-lg border bg-card transition-colors',
        isDragging && 'opacity-50 shadow-lg',
        position < 2
          ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30'
          : 'border-border'
      )}
    >
      <button
        className="cursor-grab active:cursor-grabbing touch-none"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </button>
      <span
        className={cn(
          'w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
          position < 2
            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
            : 'bg-muted text-muted-foreground'
        )}
      >
        {position + 1}
      </span>
      <span className="text-lg">{team.flag}</span>
      <span className="font-medium truncate">{team.name}</span>
    </div>
  )
}

function GroupPrediction({
  groupName,
  currentPrediction,
  onUpdate,
}: {
  groupName: string
  currentPrediction: string[]
  onUpdate: (group: string, teamIds: string[]) => void
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = currentPrediction.indexOf(active.id as string)
      const newIndex = currentPrediction.indexOf(over.id as string)
      const newOrder = arrayMove(currentPrediction, oldIndex, newIndex)
      onUpdate(groupName, newOrder)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Grupp {groupName}</CardTitle>
        <CardDescription>
          Dra för att ändra ordning
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={currentPrediction}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {currentPrediction.map((teamId, index) => (
                <SortableTeamItem
                  key={teamId}
                  id={teamId}
                  position={index}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  )
}

function PlayoffMatchCard({
  match,
  onSelectWinner,
}: {
  match: {
    id: string
    homeTeamId: string | null
    awayTeamId: string | null
    winnerId: string | null
  }
  onSelectWinner: (matchId: string, winnerId: string) => void
}) {
  const homeTeam = match.homeTeamId ? getTeamById(match.homeTeamId) : null
  const awayTeam = match.awayTeamId ? getTeamById(match.awayTeamId) : null

  if (!homeTeam || !awayTeam) {
    return (
      <div className="p-3 border rounded-lg opacity-50">
        <p className="text-center text-muted-foreground">
          Väntar på tidigare matcher...
        </p>
      </div>
    )
  }

  return (
    <div className="p-3 border rounded-lg space-y-2">
      <button
        onClick={() => onSelectWinner(match.id, homeTeam.id)}
        className={cn(
          'w-full flex items-center justify-between p-2 rounded transition-colors',
          match.winnerId === homeTeam.id
            ? 'bg-green-100 dark:bg-green-900/50 ring-2 ring-green-500'
            : 'hover:bg-accent'
        )}
      >
        <span className="flex items-center gap-2">
          <span>{homeTeam.flag}</span>
          <span className="font-medium">{homeTeam.name}</span>
        </span>
        {match.winnerId === homeTeam.id && (
          <span className="text-green-600 dark:text-green-400 text-sm">Vinnare</span>
        )}
      </button>

      <div className="text-center text-xs text-muted-foreground">vs</div>

      <button
        onClick={() => onSelectWinner(match.id, awayTeam.id)}
        className={cn(
          'w-full flex items-center justify-between p-2 rounded transition-colors',
          match.winnerId === awayTeam.id
            ? 'bg-green-100 dark:bg-green-900/50 ring-2 ring-green-500'
            : 'hover:bg-accent'
        )}
      >
        <span className="flex items-center gap-2">
          <span>{awayTeam.flag}</span>
          <span className="font-medium">{awayTeam.name}</span>
        </span>
        {match.winnerId === awayTeam.id && (
          <span className="text-green-600 dark:text-green-400 text-sm">Vinnare</span>
        )}
      </button>
    </div>
  )
}

function PlayoffMatchBracket({
  match,
  onSelectWinner,
}: {
  match: {
    id: string
    homeTeamId: string | null
    awayTeamId: string | null
    winnerId: string | null
  }
  onSelectWinner: (matchId: string, winnerId: string) => void
}) {
  const homeTeam = match.homeTeamId ? getTeamById(match.homeTeamId) : null
  const awayTeam = match.awayTeamId ? getTeamById(match.awayTeamId) : null

  if (!homeTeam || !awayTeam) {
    return (
      <div className="border rounded-lg p-1 bg-muted/50 opacity-50 text-xs">
        <div className="p-1 text-center text-muted-foreground">TBD</div>
        <div className="p-1 text-center text-muted-foreground border-t">TBD</div>
      </div>
    )
  }

  return (
    <div className="border rounded-lg bg-card text-sm">
      <button
        onClick={() => onSelectWinner(match.id, homeTeam.id)}
        className={cn(
          'w-full flex items-center gap-1 p-1.5 transition-colors rounded-t-lg',
          match.winnerId === homeTeam.id
            ? 'bg-green-100 dark:bg-green-900/50'
            : 'hover:bg-accent'
        )}
      >
        <span>{homeTeam.flag}</span>
        <span className="truncate text-xs font-medium">{homeTeam.name}</span>
      </button>
      <button
        onClick={() => onSelectWinner(match.id, awayTeam.id)}
        className={cn(
          'w-full flex items-center gap-1 p-1.5 transition-colors border-t rounded-b-lg',
          match.winnerId === awayTeam.id
            ? 'bg-green-100 dark:bg-green-900/50'
            : 'hover:bg-accent'
        )}
      >
        <span>{awayTeam.flag}</span>
        <span className="truncate text-xs font-medium">{awayTeam.name}</span>
      </button>
    </div>
  )
}
