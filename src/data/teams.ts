import { Team } from './types'

// World Cup 2026 - 48 teams in 12 groups (A-L)
// Hosts: USA, Mexico, Canada (automatic qualifiers)
// Official FIFA draw December 2025
export const teams: Team[] = [
  // Group A
  { id: 'mex', name: 'Mexiko', slug: 'mexiko', group: 'A', flag: '🇲🇽' },
  { id: 'zaf', name: 'Sydafrika', slug: 'sydafrika', group: 'A', flag: '🇿🇦' },
  { id: 'kor', name: 'Sydkorea', slug: 'sydkorea', group: 'A', flag: '🇰🇷' },
  { id: 'tbd_a', name: 'TBD (UEFA Playoff D)', slug: 'tbd-uefa-d', group: 'A', flag: '🏳️' },

  // Group B
  { id: 'can', name: 'Kanada', slug: 'kanada', group: 'B', flag: '🇨🇦' },
  { id: 'tbd_b', name: 'TBD (UEFA Playoff A)', slug: 'tbd-uefa-a', group: 'B', flag: '🏳️' },
  { id: 'qat', name: 'Qatar', slug: 'qatar', group: 'B', flag: '🇶🇦' },
  { id: 'sui', name: 'Schweiz', slug: 'schweiz', group: 'B', flag: '🇨🇭' },

  // Group C
  { id: 'bra', name: 'Brasilien', slug: 'brasilien', group: 'C', flag: '🇧🇷' },
  { id: 'mar', name: 'Marocko', slug: 'marocko', group: 'C', flag: '🇲🇦' },
  { id: 'hti', name: 'Haiti', slug: 'haiti', group: 'C', flag: '🇭🇹' },
  { id: 'sco', name: 'Skottland', slug: 'skottland', group: 'C', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },

  // Group D
  { id: 'usa', name: 'USA', slug: 'usa', group: 'D', flag: '🇺🇸' },
  { id: 'par', name: 'Paraguay', slug: 'paraguay', group: 'D', flag: '🇵🇾' },
  { id: 'aus', name: 'Australien', slug: 'australien', group: 'D', flag: '🇦🇺' },
  { id: 'tbd_d', name: 'TBD (UEFA Playoff C)', slug: 'tbd-uefa-c', group: 'D', flag: '🏳️' },

  // Group E
  { id: 'ger', name: 'Tyskland', slug: 'tyskland', group: 'E', flag: '🇩🇪' },
  { id: 'cur', name: 'Curaçao', slug: 'curacao', group: 'E', flag: '🇨🇼' },
  { id: 'civ', name: 'Elfenbenskusten', slug: 'elfenbenskusten', group: 'E', flag: '🇨🇮' },
  { id: 'ecu', name: 'Ecuador', slug: 'ecuador', group: 'E', flag: '🇪🇨' },

  // Group F
  { id: 'ned', name: 'Nederländerna', slug: 'nederlanderna', group: 'F', flag: '🇳🇱' },
  { id: 'jpn', name: 'Japan', slug: 'japan', group: 'F', flag: '🇯🇵' },
  { id: 'tbd_f', name: 'TBD (UEFA Playoff B)', slug: 'tbd-uefa-b', group: 'F', flag: '🏳️' },
  { id: 'tun', name: 'Tunisien', slug: 'tunisien', group: 'F', flag: '🇹🇳' },

  // Group G
  { id: 'bel', name: 'Belgien', slug: 'belgien', group: 'G', flag: '🇧🇪' },
  { id: 'egy', name: 'Egypten', slug: 'egypten', group: 'G', flag: '🇪🇬' },
  { id: 'irn', name: 'Iran', slug: 'iran', group: 'G', flag: '🇮🇷' },
  { id: 'nzl', name: 'Nya Zeeland', slug: 'nya-zeeland', group: 'G', flag: '🇳🇿' },

  // Group H
  { id: 'esp', name: 'Spanien', slug: 'spanien', group: 'H', flag: '🇪🇸' },
  { id: 'cpv', name: 'Kap Verde', slug: 'kap-verde', group: 'H', flag: '🇨🇻' },
  { id: 'ksa', name: 'Saudiarabien', slug: 'saudiarabien', group: 'H', flag: '🇸🇦' },
  { id: 'uru', name: 'Uruguay', slug: 'uruguay', group: 'H', flag: '🇺🇾' },

  // Group I
  { id: 'fra', name: 'Frankrike', slug: 'frankrike', group: 'I', flag: '🇫🇷' },
  { id: 'sen', name: 'Senegal', slug: 'senegal', group: 'I', flag: '🇸🇳' },
  { id: 'tbd_i', name: 'TBD (Interkont. Playoff 2)', slug: 'tbd-intercont-2', group: 'I', flag: '🏳️' },
  { id: 'nor', name: 'Norge', slug: 'norge', group: 'I', flag: '🇳🇴' },

  // Group J
  { id: 'arg', name: 'Argentina', slug: 'argentina', group: 'J', flag: '🇦🇷' },
  { id: 'alg', name: 'Algeriet', slug: 'algeriet', group: 'J', flag: '🇩🇿' },
  { id: 'aut', name: 'Österrike', slug: 'osterrike', group: 'J', flag: '🇦🇹' },
  { id: 'jor', name: 'Jordanien', slug: 'jordanien', group: 'J', flag: '🇯🇴' },

  // Group K
  { id: 'por', name: 'Portugal', slug: 'portugal', group: 'K', flag: '🇵🇹' },
  { id: 'tbd_k', name: 'TBD (Interkont. Playoff 1)', slug: 'tbd-intercont-1', group: 'K', flag: '🏳️' },
  { id: 'uzb', name: 'Uzbekistan', slug: 'uzbekistan', group: 'K', flag: '🇺🇿' },
  { id: 'col', name: 'Colombia', slug: 'colombia', group: 'K', flag: '🇨🇴' },

  // Group L
  { id: 'eng', name: 'England', slug: 'england', group: 'L', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'cro', name: 'Kroatien', slug: 'kroatien', group: 'L', flag: '🇭🇷' },
  { id: 'gha', name: 'Ghana', slug: 'ghana', group: 'L', flag: '🇬🇭' },
  { id: 'pan', name: 'Panama', slug: 'panama', group: 'L', flag: '🇵🇦' },
]

export const groupNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']

export function getTeamById(id: string): Team | undefined {
  return teams.find(t => t.id === id)
}

export function getTeamBySlug(slug: string): Team | undefined {
  return teams.find(t => t.slug === slug)
}

export function getTeamsByGroup(group: string): Team[] {
  return teams.filter(t => t.group === group)
}

// Get default group order (first team in data is position 1, etc.)
export function getDefaultGroupOrder(group: string): string[] {
  return getTeamsByGroup(group).map(t => t.id)
}
