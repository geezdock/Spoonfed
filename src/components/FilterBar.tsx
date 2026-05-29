import type { Friend } from '../types'

interface FilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  filterUser: Friend | ''
  filterCuisine: string
  filterVibe: string
  cuisineOptions: string[]
  vibeOptions: string[]
  onFilterUserChange: (value: Friend | '') => void
  onFilterCuisineChange: (value: string) => void
  onFilterVibeChange: (value: string) => void
  onClear: () => void
}

export function FilterBar({
  search,
  onSearchChange,
  filterUser,
  filterCuisine,
  filterVibe,
  cuisineOptions,
  vibeOptions,
  onFilterUserChange,
  onFilterCuisineChange,
  onFilterVibeChange,
  onClear,
}: FilterBarProps) {
  const sharedSelectClass =
    'min-h-11 rounded-full border border-black/8 bg-white/75 px-4 text-sm text-[#1a1a1a] outline-none transition focus:border-black/15 focus:ring-2 focus:ring-black/5'

  const showClear = Boolean(search || filterUser || filterCuisine || filterVibe)

  return (
    <section className="rounded-[24px] border border-black/5 bg-white/55 p-4 shadow-[0_12px_24px_rgba(26,26,26,0.04)] backdrop-blur-sm sm:p-5">
      <div className="grid gap-3 lg:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))_auto]">
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="🔍 Search spots or recs..."
          className="min-h-11 flex-1 rounded-full border border-black/8 bg-white/75 px-4 text-sm text-[#1a1a1a] outline-none transition placeholder:text-[#888888] focus:border-black/15 focus:ring-2 focus:ring-black/5"
        />
        <select
          value={filterUser}
          onChange={(event) => onFilterUserChange(event.target.value as Friend | '')}
          className={sharedSelectClass}
        >
          <option value="">👤 Anyone</option>
          <option value="Dhruva">👤 Dhruva</option>
          <option value="Ananya">👤 Ananya</option>
        </select>

        <select
          value={filterCuisine}
          onChange={(event) => onFilterCuisineChange(event.target.value)}
          className={sharedSelectClass}
        >
          <option value="">🍜 All cuisines</option>
          {cuisineOptions.map((cuisine) => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>

        <select
          value={filterVibe}
          onChange={(event) => onFilterVibeChange(event.target.value)}
          className={sharedSelectClass}
        >
          <option value="">✨ Any vibe</option>
          {vibeOptions.map((vibe) => (
            <option key={vibe} value={vibe}>
              {vibe}
            </option>
          ))}
        </select>

        {showClear ? (
          <button
            type="button"
            onClick={onClear}
            className="min-h-11 rounded-full border border-black/8 bg-white px-4 text-sm font-semibold text-[#1a1a1a] transition hover:bg-[#fbf7f1]"
          >
            Clear ✕
          </button>
        ) : (
          <div className="hidden lg:block" aria-hidden="true" />
        )}
      </div>
    </section>
  )
}