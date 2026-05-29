import type { Coordinates } from '../types'

export async function geocodeLocation(location: string): Promise<Coordinates | null> {
  if (!location.trim()) {
    return null
  }

  try {
    const endpoint = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      `${location}, Bangalore`,
    )}&format=jsonv2&limit=1`
    const response = await fetch(endpoint, {
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      return null
    }

    const results = (await response.json()) as Array<{ lat: string; lon: string }>
    const firstResult = results[0]

    if (!firstResult) {
      return null
    }

    return {
      lat: Number(firstResult.lat),
      lng: Number(firstResult.lon),
    }
  } catch {
    return null
  }
}