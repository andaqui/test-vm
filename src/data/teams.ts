import { Team } from './types'

// World Cup 2026 - 48 teams in 12 groups (A-L)
// Hosts: USA, Mexico, Canada (automatic qualifiers)
export const teams: Team[] = [
  // Group A
  { id: 'usa', name: 'USA', slug: 'usa', group: 'A', flag: '🇺🇸' },
  { id: 'ned', name: 'Nederländerna', slug: 'nederlanderna', group: 'A', flag: '🇳🇱' },
  { id: 'sen', name: 'Senegal', slug: 'senegal', group: 'A', flag: '🇸🇳' },
  { id: 'ecu', name: 'Ecuador', slug: 'ecuador', group: 'A', flag: '🇪🇨' },

  // Group B
  { id: 'eng', name: 'England', slug: 'england', group: 'B', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'den', name: 'Danmark', slug: 'danmark', group: 'B', flag: '🇩🇰' },
  { id: 'irn', name: 'Iran', slug: 'iran', group: 'B', flag: '🇮🇷' },
  { id: 'wal', name: 'Wales', slug: 'wales', group: 'B', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },

  // Group C
  { id: 'arg', name: 'Argentina', slug: 'argentina', group: 'C', flag: '🇦🇷' },
  { id: 'mex', name: 'Mexiko', slug: 'mexiko', group: 'C', flag: '🇲🇽' },
  { id: 'pol', name: 'Polen', slug: 'polen', group: 'C', flag: '🇵🇱' },
  { id: 'ksa', name: 'Saudiarabien', slug: 'saudiarabien', group: 'C', flag: '🇸🇦' },

  // Group D
  { id: 'fra', name: 'Frankrike', slug: 'frankrike', group: 'D', flag: '🇫🇷' },
  { id: 'aus', name: 'Australien', slug: 'australien', group: 'D', flag: '🇦🇺' },
  { id: 'tun', name: 'Tunisien', slug: 'tunisien', group: 'D', flag: '🇹🇳' },
  { id: 'per', name: 'Peru', slug: 'peru', group: 'D', flag: '🇵🇪' },

  // Group E
  { id: 'esp', name: 'Spanien', slug: 'spanien', group: 'E', flag: '🇪🇸' },
  { id: 'jpn', name: 'Japan', slug: 'japan', group: 'E', flag: '🇯🇵' },
  { id: 'ger', name: 'Tyskland', slug: 'tyskland', group: 'E', flag: '🇩🇪' },
  { id: 'crc', name: 'Costa Rica', slug: 'costa-rica', group: 'E', flag: '🇨🇷' },

  // Group F
  { id: 'bra', name: 'Brasilien', slug: 'brasilien', group: 'F', flag: '🇧🇷' },
  { id: 'cro', name: 'Kroatien', slug: 'kroatien', group: 'F', flag: '🇭🇷' },
  { id: 'mar', name: 'Marocko', slug: 'marocko', group: 'F', flag: '🇲🇦' },
  { id: 'can', name: 'Kanada', slug: 'kanada', group: 'F', flag: '🇨🇦' },

  // Group G
  { id: 'por', name: 'Portugal', slug: 'portugal', group: 'G', flag: '🇵🇹' },
  { id: 'uru', name: 'Uruguay', slug: 'uruguay', group: 'G', flag: '🇺🇾' },
  { id: 'kor', name: 'Sydkorea', slug: 'sydkorea', group: 'G', flag: '🇰🇷' },
  { id: 'gha', name: 'Ghana', slug: 'ghana', group: 'G', flag: '🇬🇭' },

  // Group H
  { id: 'bel', name: 'Belgien', slug: 'belgien', group: 'H', flag: '🇧🇪' },
  { id: 'sui', name: 'Schweiz', slug: 'schweiz', group: 'H', flag: '🇨🇭' },
  { id: 'srb', name: 'Serbien', slug: 'serbien', group: 'H', flag: '🇷🇸' },
  { id: 'cmr', name: 'Kamerun', slug: 'kamerun', group: 'H', flag: '🇨🇲' },

  // Group I
  { id: 'ita', name: 'Italien', slug: 'italien', group: 'I', flag: '🇮🇹' },
  { id: 'col', name: 'Colombia', slug: 'colombia', group: 'I', flag: '🇨🇴' },
  { id: 'egy', name: 'Egypten', slug: 'egypten', group: 'I', flag: '🇪🇬' },
  { id: 'jam', name: 'Jamaica', slug: 'jamaica', group: 'I', flag: '🇯🇲' },

  // Group J
  { id: 'aut', name: 'Österrike', slug: 'osterrike', group: 'J', flag: '🇦🇹' },
  { id: 'ukr', name: 'Ukraina', slug: 'ukraina', group: 'J', flag: '🇺🇦' },
  { id: 'nga', name: 'Nigeria', slug: 'nigeria', group: 'J', flag: '🇳🇬' },
  { id: 'civ', name: 'Elfenbenskusten', slug: 'elfenbenskusten', group: 'J', flag: '🇨🇮' },

  // Group K
  { id: 'tur', name: 'Turkiet', slug: 'turkiet', group: 'K', flag: '🇹🇷' },
  { id: 'chi', name: 'Chile', slug: 'chile', group: 'K', flag: '🇨🇱' },
  { id: 'alg', name: 'Algeriet', slug: 'algeriet', group: 'K', flag: '🇩🇿' },
  { id: 'nzl', name: 'Nya Zeeland', slug: 'nya-zeeland', group: 'K', flag: '🇳🇿' },

  // Group L
  { id: 'sco', name: 'Skottland', slug: 'skottland', group: 'L', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  { id: 'ven', name: 'Venezuela', slug: 'venezuela', group: 'L', flag: '🇻🇪' },
  { id: 'qat', name: 'Qatar', slug: 'qatar', group: 'L', flag: '🇶🇦' },
  { id: 'zaf', name: 'Sydafrika', slug: 'sydafrika', group: 'L', flag: '🇿🇦' },
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
