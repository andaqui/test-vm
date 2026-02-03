"use client"

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { matches } from '@/data/matches'
import { useApp } from '@/context/AppContext'

export default function Home() {
  const { formatMatchTime, selectedTeam, isTeamHighlighted } = useApp()

  // Get upcoming matches (matches without results)
  const upcomingMatches = matches
    .filter(m => !m.result)
    .slice(0, 4)

  // Get recent results
  const recentResults = matches
    .filter(m => m.result)
    .slice(-4)
    .reverse()

  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">Fotbolls-VM 2026</h1>
        <p className="text-muted-foreground text-lg">
          Följ alla matcher, grupper och tabeller
        </p>
        {selectedTeam && (
          <p className="mt-2 text-lg">
            Du följer: {selectedTeam.flag} <strong>{selectedTeam.name}</strong>
          </p>
        )}
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Navigation */}
        <Card>
          <CardHeader>
            <CardTitle>Utforska</CardTitle>
            <CardDescription>Navigera till olika delar av turneringen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <Link
                href="/groups"
                className="p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold">Grupper & Tabeller</h3>
                <p className="text-sm text-muted-foreground">Se alla grupper A-L</p>
              </Link>
              <Link
                href="/matches"
                className="p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold">Matcher & TV-tider</h3>
                <p className="text-sm text-muted-foreground">Komplett matchschema</p>
              </Link>
              <Link
                href="/playoffs"
                className="p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold">Slutspel</h3>
                <p className="text-sm text-muted-foreground">Från 32-delsfinal till final</p>
              </Link>
              <Link
                href="/predictions"
                className="p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold">Predictions</h3>
                <p className="text-sm text-muted-foreground">Gör dina egna tippningar</p>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle>Senaste resultat</CardTitle>
            <CardDescription>De senaste spelade matcherna</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentResults.map(match => (
                <div
                  key={match.id}
                  className={`p-3 border rounded-lg ${
                    isTeamHighlighted(match.homeTeam.id) || isTeamHighlighted(match.awayTeam.id)
                      ? 'ring-2 ring-primary bg-accent'
                      : ''
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span>{match.homeTeam.flag}</span>
                      <span className="font-medium">{match.homeTeam.name}</span>
                    </div>
                    <span className="font-bold">
                      {match.result?.home} - {match.result?.away}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{match.awayTeam.name}</span>
                      <span>{match.awayTeam.flag}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatMatchTime(match.kickoffTimeUTC)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Matches */}
      {upcomingMatches.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Kommande matcher</CardTitle>
            <CardDescription>Nästa matcher att se fram emot</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {upcomingMatches.map(match => (
                <div
                  key={match.id}
                  className={`p-3 border rounded-lg ${
                    isTeamHighlighted(match.homeTeam.id) || isTeamHighlighted(match.awayTeam.id)
                      ? 'ring-2 ring-primary bg-accent'
                      : ''
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span>{match.homeTeam.flag}</span>
                      <span className="font-medium">{match.homeTeam.name}</span>
                    </div>
                    <span className="text-muted-foreground">vs</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{match.awayTeam.name}</span>
                      <span>{match.awayTeam.flag}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatMatchTime(match.kickoffTimeUTC)} | {match.tvChannel}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
