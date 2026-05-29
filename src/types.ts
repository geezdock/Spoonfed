export const FRIENDS = ['Dhruva', 'Ananya'] as const

export type Friend = (typeof FRIENDS)[number]

export const CUISINES = [
  'Multi-Cuisine',
  'Indian',
  'Chinese',
  'Japanese',
  'Italian',
  'Mexican',
  'Thai',
  'Mediterranean',
  'American',
  'Korean',
  'Other',
] as const

export type Cuisine = (typeof CUISINES)[number]

export const VIBES = [
  'Casual',
  'Date Night',
  'Group',
  'Quick Bite',
  'Special Occasion',
] as const

export type Vibe = (typeof VIBES)[number]

export const PRICES = ['💸', '💸💸', '💸💸💸'] as const

export type PriceRange = (typeof PRICES)[number]

export interface Coordinates {
  lat: number | null
  lng: number | null
}

export interface RestaurantCard {
  id: string
  addedBy: Friend
  restaurantName: string
  location: string
  mapsUrl?: string
  coordinates?: Coordinates | null
  cuisine: Cuisine
  recommendation: string
  vibe: Vibe | null
  priceRange: PriceRange | null
  wouldGoAgain: boolean | null
  dateAdded: string
}