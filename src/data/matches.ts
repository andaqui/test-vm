import { Match, Group, GroupStanding } from './types'
import { teams, getTeamById } from './teams'

// Helper to create a match
function createMatch(
  id: string,
  homeId: string,
  awayId: string,
  kickoffTimeUTC: string,
  stage: Match['stage'],
  venue: string,
  tvChannel: string,
  result?: { home: number; away: number }
): Match {
  const homeTeam = getTeamById(homeId)!
  const awayTeam = getTeamById(awayId)!
  return {
    id,
    homeTeam,
    awayTeam,
    kickoffTimeUTC,
    stage,
    venue,
    tvChannel,
    result,
  }
}

export const matches: Match[] = [
  // Group A
  createMatch('m1', 'qat', 'ecu', '2022-11-20T16:00:00Z', 'group', 'Al Bayt Stadium', 'SVT', { home: 0, away: 2 }),
  createMatch('m2', 'sen', 'ned', '2022-11-21T16:00:00Z', 'group', 'Al Thumama Stadium', 'TV4', { home: 0, away: 2 }),
  createMatch('m3', 'qat', 'sen', '2022-11-25T13:00:00Z', 'group', 'Al Thumama Stadium', 'SVT', { home: 1, away: 3 }),
  createMatch('m4', 'ned', 'ecu', '2022-11-25T16:00:00Z', 'group', 'Khalifa International', 'TV4', { home: 1, away: 1 }),
  createMatch('m5', 'ned', 'qat', '2022-11-29T15:00:00Z', 'group', 'Al Bayt Stadium', 'SVT', { home: 2, away: 0 }),
  createMatch('m6', 'ecu', 'sen', '2022-11-29T15:00:00Z', 'group', 'Khalifa International', 'TV4', { home: 1, away: 2 }),

  // Group B
  createMatch('m7', 'eng', 'irn', '2022-11-21T13:00:00Z', 'group', 'Khalifa International', 'SVT', { home: 6, away: 2 }),
  createMatch('m8', 'usa', 'wal', '2022-11-21T19:00:00Z', 'group', 'Ahmad Bin Ali Stadium', 'TV4', { home: 1, away: 1 }),
  createMatch('m9', 'wal', 'irn', '2022-11-25T10:00:00Z', 'group', 'Ahmad Bin Ali Stadium', 'SVT', { home: 0, away: 2 }),
  createMatch('m10', 'eng', 'usa', '2022-11-25T19:00:00Z', 'group', 'Al Bayt Stadium', 'TV4', { home: 0, away: 0 }),
  createMatch('m11', 'wal', 'eng', '2022-11-29T19:00:00Z', 'group', 'Ahmad Bin Ali Stadium', 'SVT', { home: 0, away: 3 }),
  createMatch('m12', 'irn', 'usa', '2022-11-29T19:00:00Z', 'group', 'Al Thumama Stadium', 'TV4', { home: 0, away: 1 }),

  // Group C
  createMatch('m13', 'arg', 'ksa', '2022-11-22T10:00:00Z', 'group', 'Lusail Stadium', 'SVT', { home: 1, away: 2 }),
  createMatch('m14', 'mex', 'pol', '2022-11-22T16:00:00Z', 'group', 'Stadium 974', 'TV4', { home: 0, away: 0 }),
  createMatch('m15', 'pol', 'ksa', '2022-11-26T13:00:00Z', 'group', 'Education City Stadium', 'SVT', { home: 2, away: 0 }),
  createMatch('m16', 'arg', 'mex', '2022-11-26T19:00:00Z', 'group', 'Lusail Stadium', 'TV4', { home: 2, away: 0 }),
  createMatch('m17', 'pol', 'arg', '2022-11-30T19:00:00Z', 'group', 'Stadium 974', 'SVT', { home: 0, away: 2 }),
  createMatch('m18', 'ksa', 'mex', '2022-11-30T19:00:00Z', 'group', 'Lusail Stadium', 'TV4', { home: 1, away: 2 }),

  // Group D
  createMatch('m19', 'den', 'tun', '2022-11-22T13:00:00Z', 'group', 'Education City Stadium', 'SVT', { home: 0, away: 0 }),
  createMatch('m20', 'fra', 'aus', '2022-11-22T19:00:00Z', 'group', 'Al Janoub Stadium', 'TV4', { home: 4, away: 1 }),
  createMatch('m21', 'tun', 'aus', '2022-11-26T10:00:00Z', 'group', 'Al Janoub Stadium', 'SVT', { home: 0, away: 1 }),
  createMatch('m22', 'fra', 'den', '2022-11-26T16:00:00Z', 'group', 'Stadium 974', 'TV4', { home: 2, away: 1 }),
  createMatch('m23', 'tun', 'fra', '2022-11-30T15:00:00Z', 'group', 'Education City Stadium', 'SVT', { home: 1, away: 0 }),
  createMatch('m24', 'aus', 'den', '2022-11-30T15:00:00Z', 'group', 'Al Janoub Stadium', 'TV4', { home: 1, away: 0 }),

  // Group E
  createMatch('m25', 'ger', 'jpn', '2022-11-23T13:00:00Z', 'group', 'Khalifa International', 'SVT', { home: 1, away: 2 }),
  createMatch('m26', 'esp', 'crc', '2022-11-23T16:00:00Z', 'group', 'Al Thumama Stadium', 'TV4', { home: 7, away: 0 }),
  createMatch('m27', 'jpn', 'crc', '2022-11-27T10:00:00Z', 'group', 'Ahmad Bin Ali Stadium', 'SVT', { home: 0, away: 1 }),
  createMatch('m28', 'esp', 'ger', '2022-11-27T19:00:00Z', 'group', 'Al Bayt Stadium', 'TV4', { home: 1, away: 1 }),
  createMatch('m29', 'jpn', 'esp', '2022-12-01T19:00:00Z', 'group', 'Khalifa International', 'SVT', { home: 2, away: 1 }),
  createMatch('m30', 'crc', 'ger', '2022-12-01T19:00:00Z', 'group', 'Al Bayt Stadium', 'TV4', { home: 2, away: 4 }),

  // Group F
  createMatch('m31', 'mar', 'cro', '2022-11-23T10:00:00Z', 'group', 'Al Bayt Stadium', 'SVT', { home: 0, away: 0 }),
  createMatch('m32', 'bel', 'can', '2022-11-23T19:00:00Z', 'group', 'Ahmad Bin Ali Stadium', 'TV4', { home: 1, away: 0 }),
  createMatch('m33', 'bel', 'mar', '2022-11-27T13:00:00Z', 'group', 'Al Thumama Stadium', 'SVT', { home: 0, away: 2 }),
  createMatch('m34', 'cro', 'can', '2022-11-27T16:00:00Z', 'group', 'Khalifa International', 'TV4', { home: 4, away: 1 }),
  createMatch('m35', 'cro', 'bel', '2022-12-01T15:00:00Z', 'group', 'Ahmad Bin Ali Stadium', 'SVT', { home: 0, away: 0 }),
  createMatch('m36', 'can', 'mar', '2022-12-01T15:00:00Z', 'group', 'Al Thumama Stadium', 'TV4', { home: 1, away: 2 }),

  // Group G
  createMatch('m37', 'sui', 'cmr', '2022-11-24T10:00:00Z', 'group', 'Al Janoub Stadium', 'SVT', { home: 1, away: 0 }),
  createMatch('m38', 'bra', 'srb', '2022-11-24T19:00:00Z', 'group', 'Lusail Stadium', 'TV4', { home: 2, away: 0 }),
  createMatch('m39', 'cmr', 'srb', '2022-11-28T10:00:00Z', 'group', 'Al Janoub Stadium', 'SVT', { home: 3, away: 3 }),
  createMatch('m40', 'bra', 'sui', '2022-11-28T16:00:00Z', 'group', 'Stadium 974', 'TV4', { home: 1, away: 0 }),
  createMatch('m41', 'cmr', 'bra', '2022-12-02T19:00:00Z', 'group', 'Lusail Stadium', 'SVT', { home: 1, away: 0 }),
  createMatch('m42', 'srb', 'sui', '2022-12-02T19:00:00Z', 'group', 'Stadium 974', 'TV4', { home: 2, away: 3 }),

  // Group H
  createMatch('m43', 'uru', 'kor', '2022-11-24T13:00:00Z', 'group', 'Education City Stadium', 'SVT', { home: 0, away: 0 }),
  createMatch('m44', 'por', 'gha', '2022-11-24T16:00:00Z', 'group', 'Stadium 974', 'TV4', { home: 3, away: 2 }),
  createMatch('m45', 'kor', 'gha', '2022-11-28T13:00:00Z', 'group', 'Education City Stadium', 'SVT', { home: 2, away: 3 }),
  createMatch('m46', 'por', 'uru', '2022-11-28T19:00:00Z', 'group', 'Lusail Stadium', 'TV4', { home: 2, away: 0 }),
  createMatch('m47', 'kor', 'por', '2022-12-02T15:00:00Z', 'group', 'Education City Stadium', 'SVT', { home: 2, away: 1 }),
  createMatch('m48', 'gha', 'uru', '2022-12-02T15:00:00Z', 'group', 'Al Janoub Stadium', 'TV4', { home: 0, away: 2 }),

  // Round of 16
  createMatch('r16-1', 'ned', 'usa', '2022-12-03T15:00:00Z', 'round_of_16', 'Khalifa International', 'SVT', { home: 3, away: 1 }),
  createMatch('r16-2', 'arg', 'aus', '2022-12-03T19:00:00Z', 'round_of_16', 'Ahmad Bin Ali Stadium', 'TV4', { home: 2, away: 1 }),
  createMatch('r16-3', 'fra', 'pol', '2022-12-04T15:00:00Z', 'round_of_16', 'Al Thumama Stadium', 'SVT', { home: 3, away: 1 }),
  createMatch('r16-4', 'eng', 'sen', '2022-12-04T19:00:00Z', 'round_of_16', 'Al Bayt Stadium', 'TV4', { home: 3, away: 0 }),
  createMatch('r16-5', 'jpn', 'cro', '2022-12-05T15:00:00Z', 'round_of_16', 'Al Janoub Stadium', 'SVT', { home: 1, away: 1 }),
  createMatch('r16-6', 'bra', 'kor', '2022-12-05T19:00:00Z', 'round_of_16', 'Stadium 974', 'TV4', { home: 4, away: 1 }),
  createMatch('r16-7', 'mar', 'esp', '2022-12-06T15:00:00Z', 'round_of_16', 'Education City Stadium', 'SVT', { home: 0, away: 0 }),
  createMatch('r16-8', 'por', 'sui', '2022-12-06T19:00:00Z', 'round_of_16', 'Lusail Stadium', 'TV4', { home: 6, away: 1 }),

  // Quarter finals
  createMatch('qf-1', 'cro', 'bra', '2022-12-09T15:00:00Z', 'quarter', 'Education City Stadium', 'SVT', { home: 1, away: 1 }),
  createMatch('qf-2', 'ned', 'arg', '2022-12-09T19:00:00Z', 'quarter', 'Lusail Stadium', 'TV4', { home: 2, away: 2 }),
  createMatch('qf-3', 'mar', 'por', '2022-12-10T15:00:00Z', 'quarter', 'Al Thumama Stadium', 'SVT', { home: 1, away: 0 }),
  createMatch('qf-4', 'eng', 'fra', '2022-12-10T19:00:00Z', 'quarter', 'Al Bayt Stadium', 'TV4', { home: 1, away: 2 }),

  // Semi finals
  createMatch('sf-1', 'arg', 'cro', '2022-12-13T19:00:00Z', 'semi', 'Lusail Stadium', 'SVT', { home: 3, away: 0 }),
  createMatch('sf-2', 'fra', 'mar', '2022-12-14T19:00:00Z', 'semi', 'Al Bayt Stadium', 'TV4', { home: 2, away: 0 }),

  // Final
  createMatch('final', 'arg', 'fra', '2022-12-18T15:00:00Z', 'final', 'Lusail Stadium', 'SVT/TV4', { home: 3, away: 3 }),
]

export function getMatchesByTeam(teamId: string): Match[] {
  return matches.filter(m => m.homeTeam.id === teamId || m.awayTeam.id === teamId)
}

export function getMatchesByStage(stage: Match['stage']): Match[] {
  return matches.filter(m => m.stage === stage)
}

export function getMatchesByGroup(group: string): Match[] {
  return matches.filter(m => m.stage === 'group' && (m.homeTeam.group === group || m.awayTeam.group === group))
}

// Calculate group standings based on match results
export function calculateGroupStandings(group: string): GroupStanding[] {
  const groupTeams = teams.filter(t => t.group === group)
  const groupMatches = getMatchesByGroup(group)

  const standings: GroupStanding[] = groupTeams.map(team => ({
    team,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
  }))

  groupMatches.forEach(match => {
    if (!match.result) return

    const homeStanding = standings.find(s => s.team.id === match.homeTeam.id)!
    const awayStanding = standings.find(s => s.team.id === match.awayTeam.id)!

    homeStanding.played++
    awayStanding.played++

    homeStanding.goalsFor += match.result.home
    homeStanding.goalsAgainst += match.result.away
    awayStanding.goalsFor += match.result.away
    awayStanding.goalsAgainst += match.result.home

    if (match.result.home > match.result.away) {
      homeStanding.won++
      homeStanding.points += 3
      awayStanding.lost++
    } else if (match.result.home < match.result.away) {
      awayStanding.won++
      awayStanding.points += 3
      homeStanding.lost++
    } else {
      homeStanding.drawn++
      awayStanding.drawn++
      homeStanding.points += 1
      awayStanding.points += 1
    }
  })

  standings.forEach(s => {
    s.goalDifference = s.goalsFor - s.goalsAgainst
  })

  // Sort by points, then goal difference, then goals for
  return standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference
    return b.goalsFor - a.goalsFor
  })
}

export function getAllGroups(): Group[] {
  const groupNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  return groupNames.map(name => ({
    name,
    standings: calculateGroupStandings(name),
  }))
}
