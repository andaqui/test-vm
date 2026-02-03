import { Match, Group, GroupStanding } from './types'
import { teams, getTeamById, groupNames, getTeamsByGroup } from './teams'

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

// World Cup 2026 matches - placeholder dates (tournament June-July 2026)
// Group stage matches for all 12 groups
export const matches: Match[] = [
  // Group A
  createMatch('m1', 'usa', 'ecu', '2026-06-11T18:00:00Z', 'group', 'MetLife Stadium', 'SVT'),
  createMatch('m2', 'ned', 'sen', '2026-06-11T21:00:00Z', 'group', 'MetLife Stadium', 'TV4'),
  createMatch('m3', 'usa', 'ned', '2026-06-16T18:00:00Z', 'group', 'AT&T Stadium', 'SVT'),
  createMatch('m4', 'sen', 'ecu', '2026-06-16T21:00:00Z', 'group', 'Mercedes-Benz Stadium', 'TV4'),
  createMatch('m5', 'ecu', 'ned', '2026-06-21T18:00:00Z', 'group', 'MetLife Stadium', 'SVT'),
  createMatch('m6', 'sen', 'usa', '2026-06-21T18:00:00Z', 'group', 'AT&T Stadium', 'TV4'),

  // Group B
  createMatch('m7', 'eng', 'wal', '2026-06-12T15:00:00Z', 'group', 'SoFi Stadium', 'SVT'),
  createMatch('m8', 'den', 'irn', '2026-06-12T18:00:00Z', 'group', 'Levi\'s Stadium', 'TV4'),
  createMatch('m9', 'eng', 'den', '2026-06-17T15:00:00Z', 'group', 'SoFi Stadium', 'SVT'),
  createMatch('m10', 'irn', 'wal', '2026-06-17T18:00:00Z', 'group', 'Levi\'s Stadium', 'TV4'),
  createMatch('m11', 'wal', 'den', '2026-06-22T15:00:00Z', 'group', 'SoFi Stadium', 'SVT'),
  createMatch('m12', 'irn', 'eng', '2026-06-22T15:00:00Z', 'group', 'Levi\'s Stadium', 'TV4'),

  // Group C
  createMatch('m13', 'arg', 'ksa', '2026-06-12T21:00:00Z', 'group', 'Estadio Azteca', 'SVT'),
  createMatch('m14', 'mex', 'pol', '2026-06-13T00:00:00Z', 'group', 'Estadio Azteca', 'TV4'),
  createMatch('m15', 'arg', 'mex', '2026-06-17T21:00:00Z', 'group', 'Estadio Azteca', 'SVT'),
  createMatch('m16', 'pol', 'ksa', '2026-06-18T00:00:00Z', 'group', 'Estadio BBVA', 'TV4'),
  createMatch('m17', 'ksa', 'mex', '2026-06-22T21:00:00Z', 'group', 'Estadio Azteca', 'SVT'),
  createMatch('m18', 'pol', 'arg', '2026-06-22T21:00:00Z', 'group', 'Estadio BBVA', 'TV4'),

  // Group D
  createMatch('m19', 'fra', 'per', '2026-06-13T15:00:00Z', 'group', 'Hard Rock Stadium', 'SVT'),
  createMatch('m20', 'aus', 'tun', '2026-06-13T18:00:00Z', 'group', 'Lincoln Financial Field', 'TV4'),
  createMatch('m21', 'fra', 'aus', '2026-06-18T15:00:00Z', 'group', 'Hard Rock Stadium', 'SVT'),
  createMatch('m22', 'tun', 'per', '2026-06-18T18:00:00Z', 'group', 'Lincoln Financial Field', 'TV4'),
  createMatch('m23', 'per', 'aus', '2026-06-23T15:00:00Z', 'group', 'Hard Rock Stadium', 'SVT'),
  createMatch('m24', 'tun', 'fra', '2026-06-23T15:00:00Z', 'group', 'Lincoln Financial Field', 'TV4'),

  // Group E
  createMatch('m25', 'esp', 'crc', '2026-06-13T21:00:00Z', 'group', 'BC Place', 'SVT'),
  createMatch('m26', 'ger', 'jpn', '2026-06-14T00:00:00Z', 'group', 'BMO Field', 'TV4'),
  createMatch('m27', 'esp', 'ger', '2026-06-18T21:00:00Z', 'group', 'BC Place', 'SVT'),
  createMatch('m28', 'jpn', 'crc', '2026-06-19T00:00:00Z', 'group', 'BMO Field', 'TV4'),
  createMatch('m29', 'crc', 'ger', '2026-06-23T21:00:00Z', 'group', 'BC Place', 'SVT'),
  createMatch('m30', 'jpn', 'esp', '2026-06-23T21:00:00Z', 'group', 'BMO Field', 'TV4'),

  // Group F
  createMatch('m31', 'bra', 'can', '2026-06-14T15:00:00Z', 'group', 'Rose Bowl', 'SVT'),
  createMatch('m32', 'cro', 'mar', '2026-06-14T18:00:00Z', 'group', 'Lumen Field', 'TV4'),
  createMatch('m33', 'bra', 'cro', '2026-06-19T15:00:00Z', 'group', 'Rose Bowl', 'SVT'),
  createMatch('m34', 'mar', 'can', '2026-06-19T18:00:00Z', 'group', 'Lumen Field', 'TV4'),
  createMatch('m35', 'can', 'cro', '2026-06-24T15:00:00Z', 'group', 'Rose Bowl', 'SVT'),
  createMatch('m36', 'mar', 'bra', '2026-06-24T15:00:00Z', 'group', 'Lumen Field', 'TV4'),

  // Group G
  createMatch('m37', 'por', 'gha', '2026-06-14T21:00:00Z', 'group', 'MetLife Stadium', 'SVT'),
  createMatch('m38', 'uru', 'kor', '2026-06-15T00:00:00Z', 'group', 'AT&T Stadium', 'TV4'),
  createMatch('m39', 'por', 'uru', '2026-06-19T21:00:00Z', 'group', 'MetLife Stadium', 'SVT'),
  createMatch('m40', 'kor', 'gha', '2026-06-20T00:00:00Z', 'group', 'AT&T Stadium', 'TV4'),
  createMatch('m41', 'gha', 'uru', '2026-06-24T21:00:00Z', 'group', 'MetLife Stadium', 'SVT'),
  createMatch('m42', 'kor', 'por', '2026-06-24T21:00:00Z', 'group', 'AT&T Stadium', 'TV4'),

  // Group H
  createMatch('m43', 'bel', 'cmr', '2026-06-15T15:00:00Z', 'group', 'Mercedes-Benz Stadium', 'SVT'),
  createMatch('m44', 'sui', 'srb', '2026-06-15T18:00:00Z', 'group', 'NRG Stadium', 'TV4'),
  createMatch('m45', 'bel', 'sui', '2026-06-20T15:00:00Z', 'group', 'Mercedes-Benz Stadium', 'SVT'),
  createMatch('m46', 'srb', 'cmr', '2026-06-20T18:00:00Z', 'group', 'NRG Stadium', 'TV4'),
  createMatch('m47', 'cmr', 'sui', '2026-06-25T15:00:00Z', 'group', 'Mercedes-Benz Stadium', 'SVT'),
  createMatch('m48', 'srb', 'bel', '2026-06-25T15:00:00Z', 'group', 'NRG Stadium', 'TV4'),

  // Group I
  createMatch('m49', 'ita', 'jam', '2026-06-15T21:00:00Z', 'group', 'SoFi Stadium', 'SVT'),
  createMatch('m50', 'col', 'egy', '2026-06-16T00:00:00Z', 'group', 'Levi\'s Stadium', 'TV4'),
  createMatch('m51', 'ita', 'col', '2026-06-20T21:00:00Z', 'group', 'SoFi Stadium', 'SVT'),
  createMatch('m52', 'egy', 'jam', '2026-06-21T00:00:00Z', 'group', 'Levi\'s Stadium', 'TV4'),
  createMatch('m53', 'jam', 'col', '2026-06-25T21:00:00Z', 'group', 'SoFi Stadium', 'SVT'),
  createMatch('m54', 'egy', 'ita', '2026-06-25T21:00:00Z', 'group', 'Levi\'s Stadium', 'TV4'),

  // Group J
  createMatch('m55', 'aut', 'civ', '2026-06-11T15:00:00Z', 'group', 'Estadio BBVA', 'SVT'),
  createMatch('m56', 'ukr', 'nga', '2026-06-11T18:00:00Z', 'group', 'Estadio Akron', 'TV4'),
  createMatch('m57', 'aut', 'ukr', '2026-06-16T15:00:00Z', 'group', 'Estadio BBVA', 'SVT'),
  createMatch('m58', 'nga', 'civ', '2026-06-16T18:00:00Z', 'group', 'Estadio Akron', 'TV4'),
  createMatch('m59', 'civ', 'ukr', '2026-06-21T15:00:00Z', 'group', 'Estadio BBVA', 'SVT'),
  createMatch('m60', 'nga', 'aut', '2026-06-21T15:00:00Z', 'group', 'Estadio Akron', 'TV4'),

  // Group K
  createMatch('m61', 'tur', 'nzl', '2026-06-12T15:00:00Z', 'group', 'BC Place', 'SVT'),
  createMatch('m62', 'chi', 'alg', '2026-06-12T18:00:00Z', 'group', 'BMO Field', 'TV4'),
  createMatch('m63', 'tur', 'chi', '2026-06-17T15:00:00Z', 'group', 'BC Place', 'SVT'),
  createMatch('m64', 'alg', 'nzl', '2026-06-17T18:00:00Z', 'group', 'BMO Field', 'TV4'),
  createMatch('m65', 'nzl', 'chi', '2026-06-22T15:00:00Z', 'group', 'BC Place', 'SVT'),
  createMatch('m66', 'alg', 'tur', '2026-06-22T15:00:00Z', 'group', 'BMO Field', 'TV4'),

  // Group L
  createMatch('m67', 'sco', 'zaf', '2026-06-13T15:00:00Z', 'group', 'Gillette Stadium', 'SVT'),
  createMatch('m68', 'ven', 'qat', '2026-06-13T18:00:00Z', 'group', 'Lincoln Financial Field', 'TV4'),
  createMatch('m69', 'sco', 'ven', '2026-06-18T15:00:00Z', 'group', 'Gillette Stadium', 'SVT'),
  createMatch('m70', 'qat', 'zaf', '2026-06-18T18:00:00Z', 'group', 'Lincoln Financial Field', 'TV4'),
  createMatch('m71', 'zaf', 'ven', '2026-06-23T15:00:00Z', 'group', 'Gillette Stadium', 'SVT'),
  createMatch('m72', 'qat', 'sco', '2026-06-23T15:00:00Z', 'group', 'Lincoln Financial Field', 'TV4'),
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
  const groupTeams = getTeamsByGroup(group)
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
  return groupNames.map(name => ({
    name,
    standings: calculateGroupStandings(name),
  }))
}
