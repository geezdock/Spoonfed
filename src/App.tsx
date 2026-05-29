import { useEffect, useMemo, useState } from 'react'
import { AddCardForm } from './components/AddCardForm'
import { FeedView } from './components/FeedView'
import { Header } from './components/Header'
import { LandingPage } from './components/LandingPage'
import { MapView } from './components/MapView'
import { Modal } from './components/Modal'
import { Toast } from './components/Toast'
import { THEMES } from './data/constants'
import { useIdentity } from './hooks/useIdentity'
import { useRestaurants } from './hooks/useRestaurants'
import type { Friend, RestaurantCard } from './types'

function App() {
  const { cards, loading, addCard } = useRestaurants()
  const { identity: activeUser, setIdentity } = useIdentity()
  const [landingSelection, setLandingSelection] = useState<Friend | null>(null)
  const [activeView, setActiveView] = useState<'map' | 'feed'>('map')
  const [search, setSearch] = useState('')
  const [filterUser, setFilterUser] = useState<Friend | ''>('')
  const [filterCuisine, setFilterCuisine] = useState('')
  const [filterVibe, setFilterVibe] = useState('')
  const [selectedPin, setSelectedPin] = useState<RestaurantCard | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const theme = activeUser ? THEMES[activeUser] : THEMES.Dhruva

  const sortedCards = useMemo(() => {
    return [...cards].sort(
      (leftCard, rightCard) =>
        new Date(rightCard.dateAdded).getTime() - new Date(leftCard.dateAdded).getTime(),
    )
  }, [cards])

  const cuisineOptions = useMemo(
    () => Array.from(new Set(sortedCards.map((card) => card.cuisine))),
    [sortedCards],
  )

  const vibeOptions = useMemo(
    () => Array.from(new Set(sortedCards.filter((card) => card.vibe).map((card) => card.vibe as string))),
    [sortedCards],
  )

  const visibleCards = useMemo(() => {
    const searchTerm = search.trim().toLowerCase()

    return sortedCards.filter((card) => {
      const matchesUser = !filterUser || card.addedBy === filterUser
      const matchesCuisine = !filterCuisine || card.cuisine === filterCuisine
      const matchesVibe = !filterVibe || card.vibe === filterVibe
      const matchesSearch =
        !searchTerm ||
        card.restaurantName.toLowerCase().includes(searchTerm) ||
        card.recommendation.toLowerCase().includes(searchTerm)

      return matchesUser && matchesCuisine && matchesVibe && matchesSearch
    })
  }, [filterCuisine, filterUser, filterVibe, search, sortedCards])

  useEffect(() => {
    if (!toastMessage) {
      return undefined
    }

    const timeout = window.setTimeout(() => {
      setToastMessage('')
    }, 2500)

    return () => window.clearTimeout(timeout)
  }, [toastMessage])

  const handleSelectIdentity = (friend: Friend) => {
    if (landingSelection) {
      return
    }

    setLandingSelection(friend)
    window.setTimeout(() => {
      setIdentity(friend)
      setActiveView('map')
      setLandingSelection(null)
    }, 400)
  }

  const handleAddCard = (card: RestaurantCard) => {
    addCard(card)
    setShowForm(false)
    setToastMessage('✨ Added! It\'s on the map.')
  }

  const clearFilters = () => {
    setSearch('')
    setFilterUser('')
    setFilterCuisine('')
    setFilterVibe('')
  }

  if (!activeUser) {
    return (
      <div className="min-h-screen bg-[var(--cream)]">
        <LandingPage selectedIdentity={landingSelection} onSelectIdentity={handleSelectIdentity} />
      </div>
    )
  }

  const appStyle = {
    '--accent': theme.accent,
    '--accent-soft': theme.accentSoft,
    '--accent-text': theme.accentText,
  } as React.CSSProperties

  return (
    <div className="flex min-h-screen flex-col transition-colors duration-400" style={appStyle}>
      <Header activeUser={activeUser} onAddSpot={() => setShowForm(true)} />

      <div className="sticky top-[72px] z-20 bg-[rgba(245,240,232,0.85)] px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl justify-center">
          <div className="flex items-center rounded-full border border-black/8 bg-white/70 p-1 shadow-sm">
            <button
              type="button"
              onClick={() => {
                setSelectedPin(null)
                setActiveView('map')
              }}
              className="min-h-11 rounded-full px-4 text-sm font-semibold transition-all duration-300"
              style={{
                backgroundColor: activeView === 'map' ? theme.accent : 'transparent',
                color: activeView === 'map' ? '#ffffff' : '#1a1a1a',
              }}
            >
              🗺️ Map
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedPin(null)
                setActiveView('feed')
              }}
              className="min-h-11 rounded-full px-4 text-sm font-semibold transition-all duration-300"
              style={{
                backgroundColor: activeView === 'feed' ? theme.accent : 'transparent',
                color: activeView === 'feed' ? '#ffffff' : '#1a1a1a',
              }}
            >
              📋 Feed
            </button>
          </div>
        </div>
      </div>

      {activeView === 'map' ? (
        <main className="flex-1 min-h-0">
          <MapView
            activeUser={activeUser}
            cards={cards}
            loading={loading}
            selectedCard={selectedPin}
            onSelectCard={setSelectedPin}
            onAddFirstSpot={() => setShowForm(true)}
          />
        </main>
      ) : (
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <FeedView
            activeUser={activeUser}
            cards={visibleCards}
            loading={loading}
            search={search}
            filterUser={filterUser}
            filterCuisine={filterCuisine}
            filterVibe={filterVibe}
            cuisineOptions={cuisineOptions}
            vibeOptions={vibeOptions}
            onSearchChange={setSearch}
            onFilterUserChange={setFilterUser}
            onFilterCuisineChange={setFilterCuisine}
            onFilterVibeChange={setFilterVibe}
            onClearFilters={clearFilters}
            onAddFirstSpot={() => setShowForm(true)}
          />
        </main>
      )}

      {showForm ? (
        <Modal onClose={() => setShowForm(false)}>
          <AddCardForm
            activeUser={activeUser}
            onCancel={() => setShowForm(false)}
            onSubmit={handleAddCard}
          />
        </Modal>
      ) : null}

      {toastMessage ? <Toast message={toastMessage} /> : null}
    </div>
  )
}

export default App
