import { EmptyState } from './EmptyState'
import { RestaurantCard } from './RestaurantCard'
import type { RestaurantCard as RestaurantCardType } from '../types'

interface FeedProps {
  cards: RestaurantCardType[]
  loading: boolean
  hasAnyCards: boolean
  onAddFirstSpot: () => void
}

export function Feed({ cards, loading, hasAnyCards, onAddFirstSpot }: FeedProps) {
  if (loading) {
    return (
      <div className="rounded-[28px] border border-black/5 bg-white/60 px-6 py-20 text-center text-sm text-[#888888] shadow-[0_12px_24px_rgba(26,26,26,0.04)]">
        Loading your journal...
      </div>
    )
  }

  if (!hasAnyCards) {
    return <EmptyState variant="no-cards" onAddFirstSpot={onAddFirstSpot} />
  }

  if (cards.length === 0) {
    return <EmptyState variant="no-results" />
  }

  return (
    <div className="space-y-4 lg:space-y-5">
      <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3 lg:gap-5 lg:space-y-5">
        {cards.map((card) => (
          <div key={card.id} className="break-inside-avoid">
            <RestaurantCard card={card} />
          </div>
        ))}
      </div>

      {cards.length === 1 ? (
        <div className="flex justify-center pt-2">
          <div className="rounded-full border border-dashed border-black/10 bg-white/50 px-4 py-2 text-sm text-[#8f8f8f]">
            Add more spots 👇
          </div>
        </div>
      ) : null}
    </div>
  )
}