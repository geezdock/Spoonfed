import { IdentityCard } from './IdentityCard'
import type { Friend } from '../types'

interface LandingPageProps {
  selectedIdentity: Friend | null
  onSelectIdentity: (friend: Friend) => void
}

export function LandingPage({ selectedIdentity, onSelectIdentity }: LandingPageProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-10 text-center sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8">
        <div className="space-y-3">
          <div className="font-display text-5xl font-semibold tracking-tight text-[#1a1a1a] sm:text-6xl">
            🥄 Spoonfed
          </div>
          <p className="text-sm text-[#888888] sm:text-base">A private food journal.</p>
        </div>

        <div className="space-y-4">
          <h1 className="font-display text-3xl font-medium tracking-tight text-[#1a1a1a] sm:text-4xl">
            Who&apos;s here?
          </h1>
          <p className="max-w-xl text-sm leading-6 text-[#888888] sm:text-base">
            Pick your name once for this browser session. Your colour, pins, and cards will follow.
          </p>
        </div>

        <div className="grid w-full gap-4 sm:grid-cols-2">
          <IdentityCard friend="Dhruva" selected={selectedIdentity === 'Dhruva'} onClick={onSelectIdentity} />
          <IdentityCard friend="Ananya" selected={selectedIdentity === 'Ananya'} onClick={onSelectIdentity} />
        </div>

        <p className="text-xs text-[#9c9c9c] sm:text-sm">Just between the two of you 🤝</p>
      </div>
    </main>
  )
}