import { buildMapsUrl, THEMES } from '../data/constants'
import type { RestaurantCard } from '../types'
import { formatRelativeTime } from '../utils/formatRelativeTime'

interface MapPopupProps {
  card: RestaurantCard
}

export function MapPopup({ card }: MapPopupProps) {
  const theme = THEMES[card.addedBy]
  const locationUrl = card.mapsUrl ?? buildMapsUrl(card.restaurantName, card.location, card.cuisine)
  const snippet = card.recommendation.length > 80 ? `${card.recommendation.slice(0, 80)}...` : card.recommendation

  return (
    <div className="w-[280px] max-w-[280px] bg-white p-3 text-left sm:w-[320px] sm:max-w-[320px]">
      <div className="rounded-[16px] border-l-4 bg-white px-3 py-3" style={{ borderLeftColor: theme.accent }}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="font-display text-lg font-semibold tracking-tight text-[#1a1a1a]">
              {card.restaurantName}
            </div>
            <div className="mt-1 text-xs text-[#888888]">
              {card.cuisine} ·{' '}
              <a
                href={locationUrl}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-dotted underline-offset-4"
              >
                {card.location}
              </a>
            </div>
          </div>

          <span className="inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[11px] font-semibold text-white" style={{ backgroundColor: theme.accent }}>
            {card.addedBy}
          </span>
        </div>

        <p className="mt-3 text-sm leading-6 text-[#2a2a2a]">
          <em>“{snippet}”</em>
        </p>

        {(card.vibe || card.priceRange) ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {card.vibe ? (
              <span className="inline-flex min-h-7 items-center rounded-full border border-black/5 bg-white/60 px-3 py-1 text-[11px] font-medium text-[#1a1a1a]">
                {card.vibe}
              </span>
            ) : null}
            {card.priceRange ? (
              <span className="inline-flex min-h-7 items-center rounded-full border border-black/5 bg-white/60 px-3 py-1 text-[11px] font-medium text-[#1a1a1a]">
                {card.priceRange}
              </span>
            ) : null}
          </div>
        ) : null}

        <div className="mt-3 text-right text-[11px] text-[#a8a8a8]">{formatRelativeTime(card.dateAdded)}</div>
      </div>
    </div>
  )
}