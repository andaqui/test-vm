export interface Team {
  id: string
  name: string
  slug: string
  group: string
  flag: string
}

export interface Match {
  id: string
  homeTeam: Team
  awayTeam: Team
  kickoffTimeUTC: string
  stage: 'group' | 'round_of_16' | 'quarter' | 'semi' | 'final'
  venue: string
  tvChannel: string
  result?: {
    home: number
    away: number
  }
}

export interface GroupStanding {
  team: Team
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
}

export interface Group {
  name: string
  standings: GroupStanding[]
}

export interface Prediction {
  groupPredictions: Record<string, string[]> // group name -> team ids in order 1-4
  playoffPredictions: Record<string, string> // match id -> winning team id
}
