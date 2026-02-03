"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Settings } from 'lucide-react'
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
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/groups', label: 'Grupper' },
  { href: '/matches', label: 'Matcher' },
  { href: '/playoffs', label: 'Slutspel' },
  { href: '/predictions', label: 'Predictions' },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const {
    selectedTeam,
    setSelectedTeam,
    hideOtherTeams,
    setHideOtherTeams,
    timezone,
    setTimezone,
  } = useApp()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">⚽</span>
            <span className="font-bold text-xl hidden sm:inline">Fotbolls-VM</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === link.href
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Settings Button (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSettingsOpen(!settingsOpen)}
              aria-label="Inställningar"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Meny"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Settings Panel (Desktop) */}
        {settingsOpen && (
          <div className="hidden md:block pb-4 border-t mt-2 pt-4">
            <div className="flex flex-wrap items-center gap-6">
              {/* Select Team */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Följ landslag:</label>
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
                  <SelectTrigger className="w-[180px]">
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
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hide-others"
                  checked={hideOtherTeams}
                  onCheckedChange={(checked) => setHideOtherTeams(checked as boolean)}
                  disabled={!selectedTeam}
                />
                <label
                  htmlFor="hide-others"
                  className={cn(
                    'text-sm font-medium cursor-pointer',
                    !selectedTeam && 'text-muted-foreground'
                  )}
                >
                  Göm andra landslag
                </label>
              </div>

              {/* Timezone */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Tidzon:</label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger className="w-[200px]">
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
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col py-4 px-4 space-y-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary py-2',
                  pathname === link.href
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Settings */}
            <div className="border-t pt-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Följ landslag:</label>
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
                  <SelectTrigger className="w-full">
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

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hide-others-mobile"
                  checked={hideOtherTeams}
                  onCheckedChange={(checked) => setHideOtherTeams(checked as boolean)}
                  disabled={!selectedTeam}
                />
                <label
                  htmlFor="hide-others-mobile"
                  className={cn(
                    'text-sm font-medium cursor-pointer',
                    !selectedTeam && 'text-muted-foreground'
                  )}
                >
                  Göm andra landslag
                </label>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tidzon:</label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger className="w-full">
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
          </nav>
        </div>
      )}
    </header>
  )
}
