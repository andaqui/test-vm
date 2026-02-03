"use client"

import { useApp, timezones } from '@/context/AppContext'
import { teams } from '@/data/teams'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

export function SettingsBar() {
  const {
    selectedTeam,
    setSelectedTeam,
    hideOtherTeams,
    setHideOtherTeams,
    timezone,
    setTimezone,
  } = useApp()

  return (
    <div className="sticky top-16 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-wrap items-center gap-4">
          {/* Select Team */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium whitespace-nowrap">Följ:</label>
            <Select
              value={selectedTeam?.id || ''}
              onValueChange={(value) => {
                if (value === 'none') {
                  setSelectedTeam(null)
                } else {
                  const team = teams.find(t => t.id === value)
                  setSelectedTeam(team || null)
                }
              }}
            >
              <SelectTrigger className="w-[160px] h-9">
                <SelectValue placeholder="Välj landslag">
                  {selectedTeam ? `${selectedTeam.flag} ${selectedTeam.name}` : 'Välj landslag'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Inget valt</SelectItem>
                {teams.map(team => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.flag} {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Hide Other Teams */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="hide-others-bar"
              checked={hideOtherTeams}
              onCheckedChange={(checked) => setHideOtherTeams(checked as boolean)}
              disabled={!selectedTeam}
            />
            <label
              htmlFor="hide-others-bar"
              className={cn(
                'text-sm font-medium cursor-pointer whitespace-nowrap',
                !selectedTeam && 'text-muted-foreground'
              )}
            >
              Göm andra landslag
            </label>
          </div>

          {/* Timezone */}
          <div className="flex items-center gap-2 ml-auto">
            <label className="text-sm font-medium whitespace-nowrap hidden sm:inline">Tidzon:</label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="w-[140px] sm:w-[180px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timezones.map(tz => (
                  <SelectItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
