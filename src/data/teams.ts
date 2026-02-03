import { Team } from './types'

export const teams: Team[] = [
  // Group A
  { id: 'qat', name: 'Qatar', slug: 'qatar', group: 'A', flag: '🇶🇦' },
  { id: 'ecu', name: 'Ecuador', slug: 'ecuador', group: 'A', flag: '🇪🇨' },
  { id: 'sen', name: 'Senegal', slug: 'senegal', group: 'A', flag: '🇸🇳' },
  { id: 'ned', name: 'Nederländerna', slug: 'nederlanderna', group: 'A', flag: '🇳🇱' },

  // Group B
  { id: 'eng', name: 'England', slug: 'england', group: 'B', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'irn', name: 'Iran', slug: 'iran', group: 'B', flag: '🇮🇷' },
  { id: 'usa', name: 'USA', slug: 'usa', group: 'B', flag: '🇺🇸' },
  { id: 'wal', name: 'Wales', slug: 'wales', group: 'B', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },

  // Group C
  { id: 'arg', name: 'Argentina', slug: 'argentina', group: 'C', flag: '🇦🇷' },
  { id: 'ksa', name: 'Saudiarabien', slug: 'saudiarabien', group: 'C', flag: '🇸🇦' },
  { id: 'mex', name: 'Mexiko', slug: 'mexiko', group: 'C', flag: '🇲🇽' },
  { id: 'pol', name: 'Polen', slug: 'polen', group: 'C', flag: '🇵🇱' },

  // Group D
  { id: 'fra', name: 'Frankrike', slug: 'frankrike', group: 'D', flag: '🇫🇷' },
  { id: 'aus', name: 'Australien', slug: 'australien', group: 'D', flag: '🇦🇺' },
  { id: 'den', name: 'Danmark', slug: 'danmark', group: 'D', flag: '🇩🇰' },
  { id: 'tun', name: 'Tunisien', slug: 'tunisien', group: 'D', flag: '🇹🇳' },

  // Group E
  { id: 'esp', name: 'Spanien', slug: 'spanien', group: 'E', flag: '🇪🇸' },
  { id: 'crc', name: 'Costa Rica', slug: 'costa-rica', group: 'E', flag: '🇨🇷' },
  { id: 'ger', name: 'Tyskland', slug: 'tyskland', group: 'E', flag: '🇩🇪' },
  { id: 'jpn', name: 'Japan', slug: 'japan', group: 'E', flag: '🇯🇵' },

  // Group F
  { id: 'bel', name: 'Belgien', slug: 'belgien', group: 'F', flag: '🇧🇪' },
  { id: 'can', name: 'Kanada', slug: 'kanada', group: 'F', flag: '🇨🇦' },
  { id: 'mar', name: 'Marocko', slug: 'marocko', group: 'F', flag: '🇲🇦' },
  { id: 'cro', name: 'Kroatien', slug: 'kroatien', group: 'F', flag: '🇭🇷' },

  // Group G
  { id: 'bra', name: 'Brasilien', slug: 'brasilien', group: 'G', flag: '🇧🇷' },
  { id: 'srb', name: 'Serbien', slug: 'serbien', group: 'G', flag: '🇷🇸' },
  { id: 'sui', name: 'Schweiz', slug: 'schweiz', group: 'G', flag: '🇨🇭' },
  { id: 'cmr', name: 'Kamerun', slug: 'kamerun', group: 'G', flag: '🇨🇲' },

  // Group H
  { id: 'por', name: 'Portugal', slug: 'portugal', group: 'H', flag: '🇵🇹' },
  { id: 'gha', name: 'Ghana', slug: 'ghana', group: 'H', flag: '🇬🇭' },
  { id: 'uru', name: 'Uruguay', slug: 'uruguay', group: 'H', flag: '🇺🇾' },
  { id: 'kor', name: 'Sydkorea', slug: 'sydkorea', group: 'H', flag: '🇰🇷' },
]

export function getTeamById(id: string): Team | undefined {
  return teams.find(t => t.id === id)
}

export function getTeamBySlug(slug: string): Team | undefined {
  return teams.find(t => t.slug === slug)
}

export function getTeamsByGroup(group: string): Team[] {
  return teams.filter(t => t.group === group)
}
