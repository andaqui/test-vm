"use client"

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useApp } from '@/context/AppContext'
import { matches } from '@/data/matches'
import { teams } from '@/data/teams'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const stageLabels: Record<string, string> = {
  group: 'Gruppspel',
  round_of_16: 'Sextondelsfinal',
  quarter: 'Kvartsfinal',
  semi: 'Semifinal',
  final: 'Final',
}

const stages = ['all', 'group', 'round_of_16', 'quarter', 'semi', 'final'] as const

export default function MatchesPage() {
  const { formatMatchTime, selectedTeam, hideOtherTeams, isTeamHighlighted } = useApp()
  const [stageFilter, setStageFilter] = useState<string>('all')
  const [teamFilter, setTeamFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<string>('all')

  // Get unique dates
  const uniqueDates = useMemo(() => {
    const dates = new Set<string>()
    matches.forEach(m => {
      const date = m.kickoffTimeUTC.split('T')[0]
      dates.add(date)
    })
    return Array.from(dates).sort()
  }, [])

  // Filter and sort matches
  const filteredMatches = useMemo(() => {
    let result = [...matches]

    // Stage filter
    if (stageFilter !== 'all') {
      result = result.filter(m => m.stage === stageFilter)
    }

    // Team filter (from dropdown)
    if (teamFilter !== 'all') {
      result = result.filter(
        m => m.homeTeam.id === teamFilter || m.awayTeam.id === teamFilter
      )
    }

    // Date filter
    if (dateFilter !== 'all') {
      result = result.filter(m => m.kickoffTimeUTC.startsWith(dateFilter))
    }

    // Global "hide other teams" filter
    if (hideOtherTeams && selectedTeam) {
      result = result.filter(
        m => m.homeTeam.id === selectedTeam.id || m.awayTeam.id === selectedTeam.id
      )
    }

    // Sort: Selected team's matches first, then by date
    result.sort((a, b) => {
      if (selectedTeam) {
        const aHasSelected = a.homeTeam.id === selectedTeam.id || a.awayTeam.id === selectedTeam.id
        const bHasSelected = b.homeTeam.id === selectedTeam.id || b.awayTeam.id === selectedTeam.id
        if (aHasSelected && !bHasSelected) return -1
        if (!aHasSelected && bHasSelected) return 1
      }
      return new Date(a.kickoffTimeUTC).getTime() - new Date(b.kickoffTimeUTC).getTime()
    })

    return result
  }, [stageFilter, teamFilter, dateFilter, hideOtherTeams, selectedTeam])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Matcher & TV-tider</h1>
        <p className="text-muted-foreground mt-2">
          Komplett lista över alla matcher
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="w-full sm:w-auto">
          <label className="text-sm font-medium mb-1 block">Fas</label>
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla faser</SelectItem>
              {stages.slice(1).map(stage => (
                <SelectItem key={stage} value={stage}>
                  {stageLabels[stage]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-auto">
          <label className="text-sm font-medium mb-1 block">Landslag</label>
          <Select value={teamFilter} onValueChange={setTeamFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla landslag</SelectItem>
              {teams.map(team => (
                <SelectItem key={team.id} value={team.id}>
                  {team.flag} {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-auto">
          <label className="text-sm font-medium mb-1 block">Datum</label>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla datum</SelectItem>
              {uniqueDates.map(date => (
                <SelectItem key={date} value={date}>
                  {new Date(date).toLocaleDateString('sv-SE', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Visar {filteredMatches.length} av {matches.length} matcher
      </p>

      {/* Match List */}
      <div className="space-y-3">
        {filteredMatches.map(match => {
          const isHighlighted =
            isTeamHighlighted(match.homeTeam.id) || isTeamHighlighted(match.awayTeam.id)

          return (
            <Card
              key={match.id}
              className={cn(
                isHighlighted && 'ring-2 ring-primary',
                !isHighlighted && selectedTeam && 'opacity-60'
              )}
            >
              <CardContent className="pt-4">
                <div className="flex flex-col gap-3">
                  {/* Teams and Result */}
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/teams/${match.homeTeam.slug}`}
                      className="flex items-center gap-2 hover:underline flex-1"
                    >
                      <span className="text-xl">{match.homeTeam.flag}</span>
                      <span className="font-medium">{match.homeTeam.name}</span>
                    </Link>

                    <div className="px-4 text-center min-w-[80px]">
                      {match.result ? (
                        <span className="text-xl font-bold">
                          {match.result.home} - {match.result.away}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">vs</span>
                      )}
                    </div>

                    <Link
                      href={`/teams/${match.awayTeam.slug}`}
                      className="flex items-center gap-2 hover:underline flex-1 justify-end"
                    >
                      <span className="font-medium">{match.awayTeam.name}</span>
                      <span className="text-xl">{match.awayTeam.flag}</span>
                    </Link>
                  </div>

                  {/* Match Details */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground border-t pt-3">
                    <span>{formatMatchTime(match.kickoffTimeUTC)}</span>
                    <span className="px-2 py-0.5 bg-muted rounded text-xs">
                      {stageLabels[match.stage]}
                    </span>
                    <span>{match.venue}</span>
                    <span className="font-medium">TV: {match.tvChannel}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredMatches.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          Inga matcher matchar dina filter.
        </p>
      )}
    </div>
  )
}
