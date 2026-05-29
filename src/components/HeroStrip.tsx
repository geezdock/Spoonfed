import type { Friend } from '../types'

interface HeroStripProps {
  activeUser: Friend
  cardCount: number
  accentStart: string
  accentEnd: string
}

export function HeroStrip({ activeUser, cardCount, accentStart, accentEnd }: HeroStripProps) {
  return (
    <section
      className="-mx-4 rounded-none px-4 py-6 text-white shadow-[0_20px_45px_rgba(26,26,26,0.14)] sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      style={{ background: `linear-gradient(135deg, ${accentStart}, ${accentEnd})` }}
    >
      <div className="max-w-3xl">
        <p className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Dhruva &amp; Ananya&apos;s Food Journal 🍽️
        </p>
        <p className="mt-2 text-sm font-medium text-white/90 sm:text-base">
          {cardCount} spots logged · browsing as {activeUser}
        </p>
      </div>
    </section>
  )
}