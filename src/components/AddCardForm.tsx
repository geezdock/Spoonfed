import { useState } from 'react'
import { buildMapsUrl, CUISINES, PRICES, VIBES, THEMES } from '../data/constants'
import { useGeocoding } from '../hooks/useGeocoding'
import type { Coordinates, Cuisine, Friend, PriceRange, RestaurantCard, Vibe } from '../types'

interface AddCardFormProps {
  activeUser: Friend
  onCancel: () => void
  onSubmit: (card: RestaurantCard) => void
}

interface FormState {
  restaurantName: string
  location: string
  cuisine: Cuisine | ''
  recommendation: string
  vibe: Vibe | ''
  priceRange: PriceRange | ''
  wouldGoAgain: boolean | null
}

const initialState: FormState = {
  restaurantName: '',
  location: '',
  cuisine: '',
  recommendation: '',
  vibe: '',
  priceRange: '',
  wouldGoAgain: null,
}

export function AddCardForm({ activeUser, onCancel, onSubmit }: AddCardFormProps) {
  const theme = THEMES[activeUser]
  const [values, setValues] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const { geocodeLocation, loading: geocoding } = useGeocoding()

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }))
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors }
      delete nextErrors[field]
      return nextErrors
    })
  }

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {}

    if (!values.restaurantName.trim()) {
      nextErrors.restaurantName = 'Restaurant name is required.'
    }

    if (!values.location.trim()) {
      nextErrors.location = 'Location is required.'
    }

    if (!values.cuisine) {
      nextErrors.cuisine = 'Choose a cuisine.'
    }

    if (!values.recommendation.trim()) {
      nextErrors.recommendation = 'Please share a recommendation.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validate()) {
      return
    }

    setSubmitting(true)
    const coordinates: Coordinates | null = await geocodeLocation(values.location.trim())

    onSubmit({
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      addedBy: activeUser,
      restaurantName: values.restaurantName.trim(),
      location: values.location.trim(),
      mapsUrl: buildMapsUrl(values.restaurantName.trim(), values.location.trim(), values.cuisine),
      coordinates,
      cuisine: values.cuisine as Cuisine,
      recommendation: values.recommendation.trim(),
      vibe: values.vibe || null,
      priceRange: values.priceRange || null,
      wouldGoAgain: values.wouldGoAgain,
      dateAdded: new Date().toISOString(),
    })

    setValues(initialState)
    setErrors({})
    setSubmitting(false)
  }

  const fieldClass =
    'min-h-11 w-full rounded-2xl border border-black/8 bg-white px-4 text-sm text-[#1a1a1a] outline-none transition placeholder:text-[#9b9b9b] focus:border-black/15 focus:ring-2 focus:ring-black/5'

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4 border-b border-black/5 px-5 py-5 sm:px-6">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1a1a1a]">
            Add a Spot 🍽️
          </h2>
          <p className="mt-2 text-sm text-[#888888]">
            Adding as <span style={{ color: theme.accent, fontWeight: 700 }}>{activeUser}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-black/8 bg-white text-lg text-[#1a1a1a] transition hover:bg-[#f8f3ea]"
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 space-y-5 px-5 py-5 sm:px-6">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#1a1a1a]">Restaurant Name</label>
            <input
              value={values.restaurantName}
              onChange={(event) => updateField('restaurantName', event.target.value)}
              placeholder="e.g. Koshy's"
              className={fieldClass}
            />
            {errors.restaurantName ? <p className="mt-2 text-sm text-[#b53b3b]">{errors.restaurantName}</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1a1a1a]">Area / Location</label>
            <input
              value={values.location}
              onChange={(event) => updateField('location', event.target.value)}
              placeholder="e.g. St. Marks Road, Bangalore"
              className={fieldClass}
            />
            {errors.location ? <p className="mt-2 text-sm text-[#b53b3b]">{errors.location}</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1a1a1a]">Cuisine</label>
            <select
              value={values.cuisine}
              onChange={(event) => updateField('cuisine', event.target.value as Cuisine | '')}
              className={fieldClass}
            >
              <option value="">Select cuisine...</option>
              {CUISINES.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
            {errors.cuisine ? <p className="mt-2 text-sm text-[#b53b3b]">{errors.cuisine}</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1a1a1a]">Your Recommendation</label>
            <textarea
              value={values.recommendation}
              onChange={(event) => updateField('recommendation', event.target.value)}
              placeholder="What's your honest take? What should they order?"
              rows={3}
              className={`${fieldClass} resize-none py-3`}
            />
            {errors.recommendation ? (
              <p className="mt-2 text-sm text-[#b53b3b]">{errors.recommendation}</p>
            ) : null}
          </div>
        </div>

        <div className="relative flex items-center py-2">
          <div className="h-px flex-1 border-t border-dashed border-black/15" />
          <span className="px-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9a9a9a]">
            Optional
          </span>
          <div className="h-px flex-1 border-t border-dashed border-black/15" />
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#1a1a1a]">Vibe</label>
            <select
              value={values.vibe}
              onChange={(event) => updateField('vibe', event.target.value as Vibe | '')}
              className={fieldClass}
            >
              <option value="">Choose a vibe...</option>
              {VIBES.map((vibe) => (
                <option key={vibe} value={vibe}>
                  {vibe}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1a1a1a]">Price Range</label>
            <select
              value={values.priceRange}
              onChange={(event) => updateField('priceRange', event.target.value as PriceRange | '')}
              className={fieldClass}
            >
              <option value="">Choose a price range...</option>
              {PRICES.map((price) => (
                <option key={price} value={price}>
                  {price}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#1a1a1a]">Would Go Again?</label>
            <div className="flex overflow-hidden rounded-full border border-black/8 bg-white shadow-sm">
              <button
                type="button"
                onClick={() => updateField('wouldGoAgain', true)}
                className="min-h-11 flex-1 px-4 text-sm font-semibold transition"
                style={{
                  borderRight: '1px solid rgba(26,26,26,0.08)',
                  backgroundColor: values.wouldGoAgain === true ? theme.accentSoft : '#ffffff',
                  color: values.wouldGoAgain === true ? theme.accentText : '#1a1a1a',
                }}
              >
                ✅ Yes!
              </button>
              <button
                type="button"
                onClick={() => updateField('wouldGoAgain', false)}
                className="min-h-11 flex-1 px-4 text-sm font-semibold transition"
                style={{
                  borderLeft: '1px solid rgba(26,26,26,0.08)',
                  backgroundColor: values.wouldGoAgain === false ? theme.accentSoft : '#ffffff',
                  color: values.wouldGoAgain === false ? theme.accentText : '#1a1a1a',
                }}
              >
                ❌ Nope
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-10 flex flex-col gap-3 border-t border-black/5 bg-[#fdf8ef]/95 px-5 py-4 backdrop-blur-md sm:flex-row sm:justify-end sm:px-6">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-sm font-semibold text-[#1a1a1a] transition hover:bg-[#faf6ef]"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting || geocoding}
          className="inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-80"
          style={{ backgroundColor: theme.accent }}
        >
          {submitting || geocoding ? 'Adding…' : 'Add to Journal ✨'}
        </button>
      </div>
    </form>
  )
}
