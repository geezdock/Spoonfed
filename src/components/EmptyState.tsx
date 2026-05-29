interface EmptyStateProps {
  variant: 'no-cards' | 'no-results'
  onAddFirstSpot?: () => void
}

export function EmptyState({ variant, onAddFirstSpot }: EmptyStateProps) {
  if (variant === 'no-results') {
    return (
      <div className="flex min-h-[34vh] flex-col items-center justify-center rounded-[28px] border border-dashed border-black/10 bg-white/55 px-6 py-14 text-center">
        <div className="text-5xl">🔍</div>
        <h2 className="mt-4 font-display text-3xl text-[#1a1a1a]">No results found</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-[#888888]">
          Try a different search or clear the filters.
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-h-[34vh] flex-col items-center justify-center rounded-[28px] border border-dashed border-black/10 bg-white/55 px-6 py-14 text-center">
      <div className="text-6xl">🍽️</div>
      <h2 className="mt-4 font-display text-3xl text-[#1a1a1a]">No spots yet!</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-[#888888]">
        Be the first to add a restaurant you both should try.
      </p>
      {onAddFirstSpot ? (
        <button
          type="button"
          onClick={onAddFirstSpot}
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
          style={{ backgroundColor: 'var(--accent, #e94560)' }}
        >
          Add the first spot ✨
        </button>
      ) : null}
    </div>
  )
}