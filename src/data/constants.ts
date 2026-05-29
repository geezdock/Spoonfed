import { FRIENDS, PRICES, VIBES, CUISINES } from '../types'

export { FRIENDS, CUISINES, VIBES, PRICES }

export const STORAGE_KEY = 'spoonfed-cards'
export const SESSION_USER_KEY = 'spoonfed-user'

export const BANGALORE_CENTER = {
  lat: 12.9716,
  lng: 77.5946,
}

export const MAP_ZOOM = 12

export const PIN_COLORS = {
  Dhruva: '#e94560',
  Ananya: '#f5a623',
} as const

export function buildMapsUrl(restaurantName: string, location: string, cuisine?: string) {
  const query = [restaurantName, location, cuisine].filter(Boolean).join(' ')
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export const THEMES = {
  Dhruva: {
    accent: '#e94560',
    accentSoft: '#f7dce1',
    accentText: '#a01835',
    heroStart: '#ffb2c0',
    heroEnd: '#e94560',
  },
  Ananya: {
    accent: '#f5a623',
    accentSoft: '#fde7bc',
    accentText: '#9a6100',
    heroStart: '#ffe2a8',
    heroEnd: '#f5a623',
  },
} as const

export const CARD_PALETTES = [
  { background: '#f8dccd', border: '#ef9d80' },
  { background: '#dff0fb', border: '#7ebce1' },
  { background: '#e4f3e7', border: '#7fbc93' },
  { background: '#e7e0f6', border: '#ab95e9' },
  { background: '#f5eee2', border: '#d9b98b' },
  { background: '#fde0df', border: '#ee9aa0' },
] as const