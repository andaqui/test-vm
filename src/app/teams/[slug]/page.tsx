"use client"

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useApp } from '@/context/AppContext'
import { getTeamBySlug } from '@/data/teams'
import { getMatchesByTeam, calculateGroupStandings } from '@/data/matches'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export default function TeamPage() {
  const params = useParams()
  const slug = params.slug as string
  const { formatMatchTime } = useApp()

  const team = getTeamBySlug(slug)

  if (!team) {
    notFound()
  }

  const matches = getMatchesByTeam(team.id)
  const standings = calculateGroupStandings(team.group)
  const teamStanding = standings.find(s => s.team.id === team.id)
  const teamPosition = standings.findIndex(s => s.team.id === team.id) + 1

  const upcomingMatches = matches.filter(m => !m.result)
  const playedMatches = matches.filter(m => m.result).reverse()

  const stageLabels: Record<string, string> = {
    group: 'Gruppspel',
    round_of_16: 'Sextondelsfinal',
    quarter: 'Kvartsfinal',
    semi: 'Semifinal',
    final: 'Final',
  }

  return (
    <div className="space-y-6">
      {/* Team Header */}
      <div className="flex items-center gap-4">
        <span className="text-6xl">{team.flag}</span>
        <div>
          <h1 className="text-3xl font-bold">{team.name}</h1>
          <p className="text-muted-foreground">
            Grupp {team.group} - Position {teamPosition}
          </p>
        </div>
      </div>

      {/* Team Stats */}
      {teamStanding && (
        <Card>
          <CardHeader>
            <CardTitle>Statistik i Grupp {team.group}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-2xl font-bold">{teamStanding.played}</p>
                <p className="text-sm text-muted-foreground">Spelade</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-2xl font-bold">
                  {teamStanding.won}-{teamStanding.drawn}-{teamStanding.lost}
                </p>
                <p className="text-sm text-muted-foreground">V-O-F</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-2xl font-bold">
                  {teamStanding.goalsFor}-{teamStanding.goalsAgainst}
                </p>
                <p className="text-sm text-muted-foreground">Mål</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-2xl font-bold">{teamStanding.points}</p>
                <p className="text-sm text-muted-foreground">Poäng</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Matches */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">
            Kommande ({upcomingMatches.length})
          </TabsTrigger>
          <TabsTrigger value="played">
            Spelade ({playedMatches.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-3">
          {upcomingMatches.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Inga kommande matcher
            </p>
          ) : (
            upcomingMatches.map(match => (
              <MatchCard
                key={match.id}
                match={match}
                teamId={team.id}
                formatMatchTime={formatMatchTime}
                stageLabels={stageLabels}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="played" className="space-y-3">
          {playedMatches.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Inga spelade matcher
            </p>
          ) : (
            playedMatches.map(match => (
              <MatchCard
                key={match.id}
                match={match}
                teamId={team.id}
                formatMatchTime={formatMatchTime}
                stageLabels={stageLabels}
              />
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Back Link */}
      <div className="pt-4">
        <Link href="/groups" className="text-primary hover:underline">
          &larr; Tillbaka till Grupper
        </Link>
      </div>
    </div>
  )
}

function MatchCard({
  match,
  teamId,
  formatMatchTime,
  stageLabels,
}: {
  match: ReturnType<typeof getMatchesByTeam>[0]
  teamId: string
  formatMatchTime: (time: string) => string
  stageLabels: Record<string, string>
}) {
  const isHome = match.homeTeam.id === teamId
  const opponent = isHome ? match.awayTeam : match.homeTeam

  let resultText = ''
  let resultClass = ''

  if (match.result) {
    const teamGoals = isHome ? match.result.home : match.result.away
    const opponentGoals = isHome ? match.result.away : match.result.home

    if (teamGoals > opponentGoals) {
      resultText = 'Vinst'
      resultClass = 'text-green-600 dark:text-green-400'
    } else if (teamGoals < opponentGoals) {
      resultText = 'Förlust'
      resultClass = 'text-red-600 dark:text-red-400'
    } else {
      resultText = 'Oavgjort'
      resultClass = 'text-yellow-600 dark:text-yellow-400'
    }
  }

  return (
    <Card>
      <CardContent className="pt-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Opponent */}
          <div className="flex items-center gap-3">
            <Link
              href={`/teams/${opponent.slug}`}
              className="flex items-center gap-2 hover:underline"
            >
              <span className="text-2xl">{opponent.flag}</span>
              <span className="font-semibold">{opponent.name}</span>
            </Link>
            <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded">
              {isHome ? 'Hemma' : 'Borta'}
            </span>
          </div>

          {/* Result */}
          {match.result && (
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold">
                {isHome ? match.result.home : match.result.away} - {isHome ? match.result.away : match.result.home}
              </span>
              <span className={cn('text-sm font-medium', resultClass)}>
                {resultText}
              </span>
            </div>
          )}
        </div>

        {/* Match Details */}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span>{formatMatchTime(match.kickoffTimeUTC)}</span>
          <span>{stageLabels[match.stage]}</span>
          <span>{match.venue}</span>
          <span>TV: {match.tvChannel}</span>
        </div>
      </CardContent>
    </Card>
  )
}
