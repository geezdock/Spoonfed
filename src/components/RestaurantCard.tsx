import { buildMapsUrl, CARD_PALETTES, THEMES } from '../data/constants'
import type { RestaurantCard as RestaurantCardType } from '../types'
import { formatRelativeTime } from '../utils/formatRelativeTime'

interface RestaurantCardProps {
  card: RestaurantCardType
}

function hashString(value: string) {
  let hash = 0

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0
  }

  return hash
}

export function RestaurantCard({ card }: RestaurantCardProps) {
  const palette = CARD_PALETTES[hashString(card.id) % CARD_PALETTES.length]
  const theme = THEMES[card.addedBy]
  const mapsUrl = card.mapsUrl ?? buildMapsUrl(card.restaurantName, card.location, card.cuisine)
  const tags = [card.vibe, card.priceRange, card.wouldGoAgain]
    .filter((tag) => tag !== null)
    .map((tag) => {
      if (typeof tag === 'boolean') {
        return tag ? '✅ Would return' : '❌ Would not return'
      }

      return String(tag)
    })

  return (
    <article
      className="group animate-fade-in-up rounded-[20px] border border-black/5 p-5 shadow-[0_14px_28px_rgba(26,26,26,0.08)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(26,26,26,0.14)]"
      style={{ backgroundColor: palette.background }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-[#1a1a1a]">
            {card.restaurantName}
          </h3>
          <p className="mt-1 text-sm text-[#888888]">
            {card.cuisine} ·{' '}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full px-1 py-0.5 text-[#666666] underline decoration-dotted underline-offset-4 transition hover:text-[#1a1a1a]"
              title={`Open ${card.location} in Google Maps`}
            >
              <span aria-hidden="true">📍</span>
              {card.location}
            </a>
          </p>
        </div>

        <span
          className="inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
          style={{ backgroundColor: theme.accent }}
        >
          {card.addedBy}
        </span>
      </div>

      <div
        className="mt-4 rounded-[18px] bg-white/70 p-4 text-sm leading-6 text-[#2a2a2a] shadow-sm"
        style={{ borderLeft: `4px solid ${theme.accent}` }}
      >
        <em>“{card.recommendation}”</em>
      </div>

      {tags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex min-h-8 items-center rounded-full border border-black/5 bg-white/55 px-3 py-1.5 text-xs font-medium leading-none text-[#1a1a1a]"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-4 text-right text-[11px] normal-case tracking-[0.12em] text-[#a8a8a8]">
        {formatRelativeTime(card.dateAdded)}
      </div>
    </article>
  )
}