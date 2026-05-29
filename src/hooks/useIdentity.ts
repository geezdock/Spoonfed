import { useCallback, useState } from 'react'
import { FRIENDS, SESSION_USER_KEY } from '../data/constants'
import type { Friend } from '../types'

function readIdentity() {
  if (typeof window === 'undefined') {
    return null
  }

  // Persist identity in localStorage so the last selected persona is remembered
  const storedIdentity = window.localStorage.getItem(SESSION_USER_KEY)
  return FRIENDS.includes(storedIdentity as Friend) ? (storedIdentity as Friend) : null
}

export function useIdentity() {
  const [identity, setIdentityState] = useState<Friend | null>(() => readIdentity())

  const setIdentity = useCallback((friend: Friend) => {
    window.localStorage.setItem(SESSION_USER_KEY, friend)
    setIdentityState(friend)
  }, [])

  const clearIdentity = useCallback(() => {
    window.localStorage.removeItem(SESSION_USER_KEY)
    setIdentityState(null)
  }, [])

  return {
    identity,
    setIdentity,
    clearIdentity,
  }
}