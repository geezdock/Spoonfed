import { THEMES } from '../data/constants'
import type { Friend } from '../types'

interface IdentityCardProps {
  friend: Friend
  selected?: boolean
  onClick: (friend: Friend) => void
}

export function IdentityCard({ friend, selected = false, onClick }: IdentityCardProps) {
  const theme = THEMES[friend]
  const initial = friend.charAt(0)

  return (
    <button
      type="button"
      onClick={() => onClick(friend)}
      className={`group flex min-h-[180px] w-full flex-col items-center justify-center gap-4 rounded-[28px] border bg-white/70 p-6 text-center shadow-[0_18px_40px_rgba(26,26,26,0.08)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(26,26,26,0.14)] sm:min-h-[220px] ${
        selected ? 'scale-[1.05] border-transparent' : 'border-black/8'
      }`}
      style={{
        boxShadow: selected ? `0 0 0 4px ${theme.accentSoft}, 0 18px 40px rgba(26,26,26,0.08)` : undefined,
      }}
    >
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full text-3xl font-semibold text-white transition duration-200 group-hover:scale-105"
        style={{ backgroundColor: theme.accent }}
      >
        {initial}
      </div>
      <div className="font-display text-3xl font-semibold tracking-tight text-[#1a1a1a] sm:text-4xl">
        {friend}
      </div>
      <div className="text-sm text-[#888888]">Tap to enter</div>
    </button>
  )
}