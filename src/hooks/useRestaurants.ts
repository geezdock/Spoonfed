import { useCallback, useEffect, useRef, useState } from 'react'
import type { RestaurantCard } from '../types'
import { loadCards, saveCards } from '../storage'
import { geocodeLocation } from '../utils/geocodeLocation'

export function useRestaurants() {
  const [cards, setCards] = useState<RestaurantCard[]>([])
  const [loading, setLoading] = useState(true)
  const backfillAttemptedRef = useRef(false)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setCards(loadCards())
      setLoading(false)
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (loading || backfillAttemptedRef.current) {
      return
    }

    const missingCoordinates = cards.filter(
      (card) => card.coordinates?.lat == null || card.coordinates?.lng == null,
    )

    if (missingCoordinates.length === 0) {
      return
    }

    backfillAttemptedRef.current = true
    let cancelled = false

    const runBackfill = async () => {
      const nextCards = await Promise.all(
        cards.map(async (card) => {
          if (card.coordinates?.lat != null && card.coordinates?.lng != null) {
            return card
          }

          const coordinates = await geocodeLocation(card.location)
          return {
            ...card,
            coordinates,
          }
        }),
      )

      if (cancelled) {
        return
      }

      setCards(nextCards)
      saveCards(nextCards)
    }

    void runBackfill()

    return () => {
      cancelled = true
    }
  }, [cards, loading])

  const addCard = useCallback((card: RestaurantCard) => {
    setCards((currentCards) => {
      const nextCards = [card, ...currentCards]
      saveCards(nextCards)
      return nextCards
    })
  }, [])

  return {
    cards,
    loading,
    addCard,
    setCards,
  }
}