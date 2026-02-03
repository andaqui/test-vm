"use client"

import Link from 'next/link'
import { useApp } from '@/context/AppContext'
import { getMatchesByStage } from '@/data/matches'
import { Match } from '@/data/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function PlayoffsPage() {
  const { formatMatchTime, selectedTeam, hideOtherTeams, isTeamHighlighted } = useApp()

  const roundOf16 = getMatchesByStage('round_of_16')
  const quarterFinals = getMatchesByStage('quarter')
  const semiFinals = getMatchesByStage('semi')
  const finals = getMatchesByStage('final')

  // Filter function based on selected team
  const filterMatches = (matches: Match[]) => {
    if (!hideOtherTeams || !selectedTeam) return matches
    return matches.filter(
      m => m.homeTeam.id === selectedTeam.id || m.awayTeam.id === selectedTeam.id
    )
  }

  const stages = [
    { name: 'Sextondelsfinal', matches: filterMatches(roundOf16) },
    { name: 'Kvartsfinal', matches: filterMatches(quarterFinals) },
    { name: 'Semifinal', matches: filterMatches(semiFinals) },
    { name: 'Final', matches: filterMatches(finals) },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Slutspel</h1>
        <p className="text-muted-foreground mt-2">
          Från sextondelsfinal till final
        </p>
      </div>

      {/* Desktop: Horizontal bracket view */}
      <div className="hidden lg:block overflow-x-auto">
        <div className="min-w-[1000px] flex gap-4 p-4">
          {stages.map((stage, stageIndex) => (
            <div key={stage.name} className="flex-1">
              <h3 className="text-lg font-semibold text-center mb-4 pb-2 border-b">
                {stage.name}
              </h3>
              <div
                className={cn(
                  'space-y-4',
                  stageIndex === 0 && 'space-y-2',
                  stageIndex === 1 && 'space-y-8 pt-4',
                  stageIndex === 2 && 'space-y-16 pt-12',
                  stageIndex === 3 && 'pt-28'
                )}
              >
                {stage.matches.map(match => (
                  <BracketMatch
                    key={match.id}
                    match={match}
                    formatMatchTime={formatMatchTime}
                    isTeamHighlighted={isTeamHighlighted}
                    selectedTeam={selectedTeam}
                    compact={stageIndex < 2}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet: Stacked view */}
      <div className="lg:hidden space-y-6">
        {stages.map(stage => (
          <Card key={stage.name}>
            <CardHeader>
              <CardTitle>{stage.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {stage.matches.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  Inga matcher att visa
                </p>
              ) : (
                stage.matches.map(match => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    formatMatchTime={formatMatchTime}
                    isTeamHighlighted={isTeamHighlighted}
                    selectedTeam={selectedTeam}
                  />
                ))
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {hideOtherTeams && selectedTeam && stages.every(s => s.matches.length === 0) && (
        <p className="text-center text-muted-foreground py-8">
          {selectedTeam.flag} {selectedTeam.name} har inga matcher i slutspelet, eller avaktivera &quot;Göm andra landslag&quot; för att se alla matcher.
        </p>
      )}
    </div>
  )
}

function BracketMatch({
  match,
  formatMatchTime,
  isTeamHighlighted,
  selectedTeam,
  compact = false,
}: {
  match: Match
  formatMatchTime: (time: string) => string
  isTeamHighlighted: (teamId: string) => boolean
  selectedTeam: { id: string } | null
  compact?: boolean
}) {
  const homeHighlighted = isTeamHighlighted(match.homeTeam.id)
  const awayHighlighted = isTeamHighlighted(match.awayTeam.id)
  const isHighlighted = homeHighlighted || awayHighlighted
  const isDimmed = selectedTeam && !isHighlighted

  const homeWon = match.result && match.result.home > match.result.away
  const awayWon = match.result && match.result.away > match.result.home

  return (
    <div
      className={cn(
        'border rounded-lg p-2 bg-card',
        isHighlighted && 'ring-2 ring-primary',
        isDimmed && 'opacity-50'
      )}
    >
      {/* Home Team */}
      <div
        className={cn(
          'flex items-center justify-between p-1 rounded',
          homeWon && 'bg-green-100 dark:bg-green-900/30',
          homeHighlighted && 'bg-accent'
        )}
      >
        <Link
          href={`/teams/${match.homeTeam.slug}`}
          className="flex items-center gap-1 text-sm hover:underline"
        >
          <span>{match.homeTeam.flag}</span>
          <span className={cn('truncate', compact ? 'max-w-[60px]' : 'max-w-[100px]')}>
            {compact ? match.homeTeam.id.toUpperCase() : match.homeTeam.name}
          </span>
        </Link>
        {match.result && (
          <span className={cn('font-bold text-sm', homeWon && 'text-green-600 dark:text-green-400')}>
            {match.result.home}
          </span>
        )}
      </div>

      {/* Away Team */}
      <div
        className={cn(
          'flex items-center justify-between p-1 rounded border-t',
          awayWon && 'bg-green-100 dark:bg-green-900/30',
          awayHighlighted && 'bg-accent'
        )}
      >
        <Link
          href={`/teams/${match.awayTeam.slug}`}
          className="flex items-center gap-1 text-sm hover:underline"
        >
          <span>{match.awayTeam.flag}</span>
          <span className={cn('truncate', compact ? 'max-w-[60px]' : 'max-w-[100px]')}>
            {compact ? match.awayTeam.id.toUpperCase() : match.awayTeam.name}
          </span>
        </Link>
        {match.result && (
          <span className={cn('font-bold text-sm', awayWon && 'text-green-600 dark:text-green-400')}>
            {match.result.away}
          </span>
        )}
      </div>

      {!compact && (
        <p className="text-[10px] text-muted-foreground text-center mt-1">
          {formatMatchTime(match.kickoffTimeUTC)}
        </p>
      )}
    </div>
  )
}

function MatchCard({
  match,
  formatMatchTime,
  isTeamHighlighted,
  selectedTeam,
}: {
  match: Match
  formatMatchTime: (time: string) => string
  isTeamHighlighted: (teamId: string) => boolean
  selectedTeam: { id: string } | null
}) {
  const isHighlighted =
    isTeamHighlighted(match.homeTeam.id) || isTeamHighlighted(match.awayTeam.id)
  const isDimmed = selectedTeam && !isHighlighted

  return (
    <div
      className={cn(
        'p-3 border rounded-lg',
        isHighlighted && 'ring-2 ring-primary bg-accent',
        isDimmed && 'opacity-50'
      )}
    >
      <div className="flex items-center justify-between">
        <Link
          href={`/teams/${match.homeTeam.slug}`}
          className="flex items-center gap-2 hover:underline"
        >
          <span>{match.homeTeam.flag}</span>
          <span className="font-medium">{match.homeTeam.name}</span>
        </Link>

        <div className="px-4">
          {match.result ? (
            <span className="text-lg font-bold">
              {match.result.home} - {match.result.away}
            </span>
          ) : (
            <span className="text-muted-foreground">vs</span>
          )}
        </div>

        <Link
          href={`/teams/${match.awayTeam.slug}`}
          className="flex items-center gap-2 hover:underline"
        >
          <span className="font-medium">{match.awayTeam.name}</span>
          <span>{match.awayTeam.flag}</span>
        </Link>
      </div>

      <p className="text-xs text-muted-foreground mt-2">
        {formatMatchTime(match.kickoffTimeUTC)} | {match.venue} | TV: {match.tvChannel}
      </p>
    </div>
  )
}
