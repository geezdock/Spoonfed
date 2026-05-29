import type { RestaurantCard } from './types'
import { STORAGE_KEY } from './data/constants'

const hasWindow = typeof window !== 'undefined'

export function loadCards(): RestaurantCard[] {
  if (!hasWindow) {
    return []
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw) as RestaurantCard[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveCards(cards: RestaurantCard[]) {
  if (!hasWindow) {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cards))
}