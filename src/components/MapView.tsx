import { useEffect, useMemo } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { latLngBounds, type LatLngExpression } from 'leaflet'
import { BANGALORE_CENTER, MAP_ZOOM, PIN_COLORS, THEMES } from '../data/constants'
import type { Friend, RestaurantCard } from '../types'
import { MapPopup } from './MapPopup'
import { createMapPinIcon } from './MapPin'

interface MapViewProps {
  activeUser: Friend
  cards: RestaurantCard[]
  loading: boolean
  selectedCard: RestaurantCard | null
  onSelectCard: (card: RestaurantCard | null) => void
  onAddFirstSpot: () => void
}

function MapControls({ cards, onMapClick }: { cards: RestaurantCard[]; onMapClick: () => void }) {
  const map = useMap()

  useMapEvents({
    click: () => {
      onMapClick()
    },
  })

  useEffect(() => {
    const points: LatLngExpression[] = cards
      .filter((card) => card.coordinates?.lat != null && card.coordinates?.lng != null)
      .map((card) => [card.coordinates!.lat!, card.coordinates!.lng!] as LatLngExpression)

    if (points.length === 0) {
      map.setView([BANGALORE_CENTER.lat, BANGALORE_CENTER.lng], MAP_ZOOM)
      return
    }

    if (points.length === 1) {
      map.setView(points[0], 15)
      return
    }

    map.fitBounds(latLngBounds(points), {
      padding: [56, 56],
      maxZoom: 15,
    })
  }, [cards, map])

  return null
}

export function MapView({ activeUser, cards, loading, selectedCard, onSelectCard, onAddFirstSpot }: MapViewProps) {
  const theme = THEMES[activeUser]
  const mapCards = useMemo(
    () => cards.filter((card) => card.coordinates?.lat != null && card.coordinates?.lng != null),
    [cards],
  )

  const hasPins = mapCards.length > 0

  return (
    <section className="relative min-h-[70svh] bg-[#efe7dc] shadow-[0_18px_40px_rgba(26,26,26,0.08)]">
      <div className="absolute inset-0 overflow-visible rounded-[28px] border border-black/5">
        <MapContainer
          center={[BANGALORE_CENTER.lat, BANGALORE_CENTER.lng]}
          zoom={MAP_ZOOM}
          className="h-full min-h-[70svh] w-full"
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
            subdomains="abcd"
          />
          <MapControls cards={mapCards} onMapClick={() => onSelectCard(null)} />

          {mapCards.map((card) => {
            const pinColor = PIN_COLORS[card.addedBy]
            const position: LatLngExpression = [card.coordinates!.lat!, card.coordinates!.lng!]
            const isSelected = selectedCard?.id === card.id

            return (
              <Marker
                key={card.id}
                position={position}
                icon={createMapPinIcon(pinColor)}
                eventHandlers={{
                  click: () => onSelectCard(card),
                }}
              >
                {isSelected ? (
                  <Popup className="spoonfed-map-popup" closeButton={false} autoPan>
                    <MapPopup card={card} />
                  </Popup>
                ) : null}
              </Marker>
            )
          })}
        </MapContainer>
      </div>

      <div className="pointer-events-none absolute left-4 bottom-4 z-[500] rounded-full border border-black/5 bg-white/70 px-4 py-2 text-sm text-[#1a1a1a] shadow-[0_12px_24px_rgba(26,26,26,0.08)] backdrop-blur-sm">
        🔴 Dhruva&nbsp;&nbsp;🟡 Ananya
      </div>

      {loading ? (
        <div className="absolute inset-0 z-[600] flex items-center justify-center bg-white/35 backdrop-blur-[1px]">
          <div className="rounded-full bg-white px-4 py-2 text-sm text-[#1a1a1a] shadow-[0_12px_24px_rgba(26,26,26,0.08)]">
            Loading your map...
          </div>
        </div>
      ) : null}

      {!loading && !hasPins ? (
        <div className="absolute inset-0 z-[550] flex items-center justify-center px-4">
          <div className="max-w-md rounded-[28px] border border-black/5 bg-white/90 px-6 py-8 text-center shadow-[0_18px_40px_rgba(26,26,26,0.14)] backdrop-blur-sm">
            <div className="text-5xl">📍</div>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-[#1a1a1a]">
              No spots yet!
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#888888]">
              Add your first restaurant to see it pinned here.
            </p>
            <button
              type="button"
              onClick={onAddFirstSpot}
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: theme.accent }}
            >
              Add the first spot ✨
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}