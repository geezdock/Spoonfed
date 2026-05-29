import { THEMES } from '../data/constants'
import type { Friend } from '../types'

interface HeaderProps {
  activeUser: Friend
  onAddSpot: () => void
}

export function Header({ activeUser, onAddSpot }: HeaderProps) {
  const theme = THEMES[activeUser]

  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-[rgba(245,240,232,0.9)] backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="shrink-0 font-display text-xl font-semibold tracking-tight text-[#1a1a1a] sm:text-2xl">
            🥄 Spoonfed
          </div>
          <div className="hidden rounded-full border border-black/8 bg-white/70 px-3 py-1 text-sm text-[#888888] sm:inline-flex">
            Hi, {activeUser} 👋
          </div>
        </div>

        <button
          type="button"
          onClick={onAddSpot}
          className="inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
          style={{ backgroundColor: theme.accent }}
        >
          + Add Spot
        </button>
      </div>
    </header>
  )
}