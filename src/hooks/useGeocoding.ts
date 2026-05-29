import { useCallback, useState } from 'react'
import { geocodeLocation as requestGeocodeLocation } from '../utils/geocodeLocation'
import type { Coordinates } from '../types'

export function useGeocoding() {
  const [loading, setLoading] = useState(false)

  const geocodeLocation = useCallback(async (location: string): Promise<Coordinates | null> => {
    setLoading(true)

    try {
      return await requestGeocodeLocation(location)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    geocodeLocation,
  }
}