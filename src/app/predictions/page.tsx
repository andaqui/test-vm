"use client"

import { useState, useMemo, useCallback } from 'react'
import { useApp } from '@/context/AppContext'
import { teams, getTeamById } from '@/data/teams'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const groupNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

// Playoff bracket structure based on FIFA World Cup format
const playoffStructure = {
  round_of_16: [
    { id: 'r16-1', home: '1A', away: '2B' },
    { id: 'r16-2', home: '1C', away: '2D' },
    { id: 'r16-3', home: '1E', away: '2F' },
    { id: 'r16-4', home: '1G', away: '2H' },
    { id: 'r16-5', home: '1B', away: '2A' },
    { id: 'r16-6', home: '1D', away: '2C' },
    { id: 'r16-7', home: '1F', away: '2E' },
    { id: 'r16-8', home: '1H', away: '2G' },
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

  // Get team from group prediction (e.g., "1A" -> team at position 1 in group A)
  const getTeamFromGroupPosition = useCallback(
    (position: string): string | null => {
      const pos = parseInt(position[0]) - 1 // 0-indexed
      const group = position[1]
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
      if (slot.match(/^\d[A-H]$/)) {
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

  // Check if all groups are complete
  const allGroupsComplete = groupNames.every(
    g => predictions.groupPredictions[g]?.length === 4
  )

  // Get the predicted winner
  const predictedWinner = predictions.playoffPredictions['final']
    ? getTeamById(predictions.playoffPredictions['final'])
    : null

  // Reset all predictions
  const handleReset = () => {
    if (confirm('Är du säker på att du vill återställa alla predictions?')) {
      setPredictions({
        groupPredictions: {},
        playoffPredictions: {},
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Predictions</h1>
          <p className="text-muted-foreground mt-2">
            Gör dina egna tippningar - sparas automatiskt
          </p>
        </div>
        <Button variant="outline" onClick={handleReset}>
          Återställ alla
        </Button>
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
            Välj placering (1-4) för varje lag i respektive grupp
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {groupNames.map(groupName => (
              <GroupPrediction
                key={groupName}
                groupName={groupName}
                currentPrediction={predictions.groupPredictions[groupName] || []}
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
            <div className="min-w-[1000px] flex gap-6 p-4">
              {[
                { name: 'Sextondelsfinal', key: 'round_of_16' },
                { name: 'Kvartsfinal', key: 'quarter' },
                { name: 'Semifinal', key: 'semi' },
                { name: 'Final', key: 'final' },
              ].map((stage, stageIndex) => (
                <div key={stage.key} className="flex-1">
                  <h3 className="text-lg font-semibold text-center mb-4 pb-2 border-b">
                    {stage.name}
                  </h3>
                  <div
                    className={cn(
                      'space-y-2',
                      stageIndex === 1 && 'space-y-8 pt-6',
                      stageIndex === 2 && 'space-y-24 pt-16',
                      stageIndex === 3 && 'pt-36'
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

function GroupPrediction({
  groupName,
  currentPrediction,
  onUpdate,
}: {
  groupName: string
  currentPrediction: string[]
  onUpdate: (group: string, teamIds: string[]) => void
}) {
  const groupTeams = teams.filter(t => t.group === groupName)

  const handlePositionChange = (position: number, teamId: string) => {
    const newPrediction = [...currentPrediction]

    // Remove team from old position if exists
    const oldPosition = newPrediction.indexOf(teamId)
    if (oldPosition !== -1) {
      newPrediction[oldPosition] = ''
    }

    // Set team at new position
    newPrediction[position] = teamId

    // Filter out empty strings but keep array structure
    onUpdate(groupName, newPrediction)
  }

  const getSelectedTeam = (position: number) => currentPrediction[position] || ''

  const getAvailableTeams = (position: number) => {
    const selectedAtPosition = getSelectedTeam(position)
    return groupTeams.filter(t => {
      if (t.id === selectedAtPosition) return true
      return !currentPrediction.includes(t.id)
    })
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Grupp {groupName}</CardTitle>
        <CardDescription>
          {currentPrediction.filter(Boolean).length}/4 ifylld
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {[0, 1, 2, 3].map(position => {
          const availableTeams = getAvailableTeams(position)
          const selectedTeam = getSelectedTeam(position)

          return (
            <div key={position} className="flex items-center gap-2">
              <span
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold',
                  position < 2
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {position + 1}
              </span>
              <Select
                value={selectedTeam}
                onValueChange={(value) => handlePositionChange(position, value)}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Välj lag">
                    {selectedTeam && getTeamById(selectedTeam) && (
                      <span>
                        {getTeamById(selectedTeam)?.flag} {getTeamById(selectedTeam)?.name}
                      </span>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {availableTeams.map(team => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.flag} {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )
        })}
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
      <div className="border rounded-lg p-2 bg-muted/50 opacity-50">
        <div className="p-1 text-xs text-center text-muted-foreground">TBD</div>
        <div className="p-1 text-xs text-center text-muted-foreground border-t">TBD</div>
      </div>
    )
  }

  return (
    <div className="border rounded-lg bg-card">
      <button
        onClick={() => onSelectWinner(match.id, homeTeam.id)}
        className={cn(
          'w-full flex items-center gap-1 p-2 text-sm transition-colors rounded-t-lg',
          match.winnerId === homeTeam.id
            ? 'bg-green-100 dark:bg-green-900/50'
            : 'hover:bg-accent'
        )}
      >
        <span>{homeTeam.flag}</span>
        <span className="truncate font-medium">{homeTeam.name}</span>
      </button>
      <button
        onClick={() => onSelectWinner(match.id, awayTeam.id)}
        className={cn(
          'w-full flex items-center gap-1 p-2 text-sm transition-colors border-t rounded-b-lg',
          match.winnerId === awayTeam.id
            ? 'bg-green-100 dark:bg-green-900/50'
            : 'hover:bg-accent'
        )}
      >
        <span>{awayTeam.flag}</span>
        <span className="truncate font-medium">{awayTeam.name}</span>
      </button>
    </div>
  )
}
