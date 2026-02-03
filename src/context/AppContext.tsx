"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Team } from '@/data/types'
import { teams } from '@/data/teams'
import { Prediction } from '@/data/types'

interface AppContextType {
  // Selected team
  selectedTeam: Team | null
  setSelectedTeam: (team: Team | null) => void

  // Hide other teams checkbox
  hideOtherTeams: boolean
  setHideOtherTeams: (hide: boolean) => void

  // Timezone
  timezone: string
  setTimezone: (tz: string) => void

  // Predictions
  predictions: Prediction
  setPredictions: (predictions: Prediction) => void
  updateGroupPrediction: (group: string, teamIds: string[]) => void
  updatePlayoffPrediction: (matchId: string, winnerId: string) => void

  // Helper functions
  isTeamHighlighted: (teamId: string) => boolean
  shouldShowTeam: (teamId: string) => boolean
  formatMatchTime: (utcTime: string) => string
}

const defaultPredictions: Prediction = {
  groupPredictions: {},
  playoffPredictions: {},
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Common timezones
export const timezones = [
  { value: 'Europe/Stockholm', label: 'Stockholm (CET)' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'America/New_York', label: 'New York (EST)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (PST)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEDT)' },
  { value: 'UTC', label: 'UTC' },
]

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedTeam, setSelectedTeamState] = useState<Team | null>(null)
  const [hideOtherTeams, setHideOtherTeamsState] = useState(false)
  const [timezone, setTimezoneState] = useState('Europe/Stockholm')
  const [predictions, setPredictionsState] = useState<Prediction>(defaultPredictions)
  const [isClient, setIsClient] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    setIsClient(true)

    // Detect browser timezone
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const savedTimezone = localStorage.getItem('vm-timezone')
    if (savedTimezone) {
      setTimezoneState(savedTimezone)
    } else if (browserTimezone) {
      setTimezoneState(browserTimezone)
    }

    // Load selected team
    const savedTeamId = localStorage.getItem('vm-selected-team')
    if (savedTeamId) {
      const team = teams.find(t => t.id === savedTeamId)
      if (team) setSelectedTeamState(team)
    }

    // Load hide other teams setting
    const savedHideOthers = localStorage.getItem('vm-hide-others')
    if (savedHideOthers) {
      setHideOtherTeamsState(savedHideOthers === 'true')
    }

    // Load predictions
    const savedPredictions = localStorage.getItem('vm-predictions')
    if (savedPredictions) {
      try {
        setPredictionsState(JSON.parse(savedPredictions))
      } catch {
        // Ignore parse errors
      }
    }
  }, [])

  // Save to localStorage when values change
  useEffect(() => {
    if (!isClient) return
    if (selectedTeam) {
      localStorage.setItem('vm-selected-team', selectedTeam.id)
    } else {
      localStorage.removeItem('vm-selected-team')
    }
  }, [selectedTeam, isClient])

  useEffect(() => {
    if (!isClient) return
    localStorage.setItem('vm-hide-others', String(hideOtherTeams))
  }, [hideOtherTeams, isClient])

  useEffect(() => {
    if (!isClient) return
    localStorage.setItem('vm-timezone', timezone)
  }, [timezone, isClient])

  useEffect(() => {
    if (!isClient) return
    localStorage.setItem('vm-predictions', JSON.stringify(predictions))
  }, [predictions, isClient])

  const setSelectedTeam = (team: Team | null) => {
    setSelectedTeamState(team)
  }

  const setHideOtherTeams = (hide: boolean) => {
    setHideOtherTeamsState(hide)
  }

  const setTimezone = (tz: string) => {
    setTimezoneState(tz)
  }

  const setPredictions = (newPredictions: Prediction) => {
    setPredictionsState(newPredictions)
  }

  const updateGroupPrediction = (group: string, teamIds: string[]) => {
    setPredictionsState(prev => ({
      ...prev,
      groupPredictions: {
        ...prev.groupPredictions,
        [group]: teamIds,
      },
    }))
  }

  const updatePlayoffPrediction = (matchId: string, winnerId: string) => {
    setPredictionsState(prev => ({
      ...prev,
      playoffPredictions: {
        ...prev.playoffPredictions,
        [matchId]: winnerId,
      },
    }))
  }

  const isTeamHighlighted = (teamId: string): boolean => {
    return selectedTeam?.id === teamId
  }

  const shouldShowTeam = (teamId: string): boolean => {
    if (!hideOtherTeams || !selectedTeam) return true
    return selectedTeam.id === teamId
  }

  const formatMatchTime = (utcTime: string): string => {
    try {
      const date = new Date(utcTime)
      return date.toLocaleString('sv-SE', {
        timeZone: timezone,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return utcTime
    }
  }

  return (
    <AppContext.Provider
      value={{
        selectedTeam,
        setSelectedTeam,
        hideOtherTeams,
        setHideOtherTeams,
        timezone,
        setTimezone,
        predictions,
        setPredictions,
        updateGroupPrediction,
        updatePlayoffPrediction,
        isTeamHighlighted,
        shouldShowTeam,
        formatMatchTime,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
