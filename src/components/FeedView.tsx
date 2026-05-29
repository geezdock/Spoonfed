import { Feed } from './Feed'
import { FilterBar } from './FilterBar'
import { HeroStrip } from './HeroStrip'
import { THEMES } from '../data/constants'
import type { Friend, RestaurantCard } from '../types'

interface FeedViewProps {
  activeUser: Friend
  cards: RestaurantCard[]
  loading: boolean
  search: string
  filterUser: Friend | ''
  filterCuisine: string
  filterVibe: string
  cuisineOptions: string[]
  vibeOptions: string[]
  onSearchChange: (value: string) => void
  onFilterUserChange: (value: Friend | '') => void
  onFilterCuisineChange: (value: string) => void
  onFilterVibeChange: (value: string) => void
  onClearFilters: () => void
  onAddFirstSpot: () => void
}

export function FeedView({
  activeUser,
  cards,
  loading,
  search,
  filterUser,
  filterCuisine,
  filterVibe,
  cuisineOptions,
  vibeOptions,
  onSearchChange,
  onFilterUserChange,
  onFilterCuisineChange,
  onFilterVibeChange,
  onClearFilters,
  onAddFirstSpot,
}: FeedViewProps) {
  const theme = THEMES[activeUser]

  return (
    <div className="flex flex-col gap-5">
      <HeroStrip
        activeUser={activeUser}
        cardCount={cards.length}
        accentStart={theme.heroStart}
        accentEnd={theme.heroEnd}
      />

      <FilterBar
        search={search}
        filterUser={filterUser}
        filterCuisine={filterCuisine}
        filterVibe={filterVibe}
        cuisineOptions={cuisineOptions}
        vibeOptions={vibeOptions}
        onSearchChange={onSearchChange}
        onFilterUserChange={onFilterUserChange}
        onFilterCuisineChange={onFilterCuisineChange}
        onFilterVibeChange={onFilterVibeChange}
        onClear={onClearFilters}
      />

      <Feed cards={cards} loading={loading} hasAnyCards={cards.length > 0} onAddFirstSpot={onAddFirstSpot} />
    </div>
  )
}