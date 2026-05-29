# PRD — Spoonfed / OurEats

Date: 2026-05-29

## Overview

Spoonfed (OurEats) is an identity-first, client-only restaurant journaling web app. It enables quick capture of short restaurant recommendations, visual discovery via a Leaflet map, and a simple feed for browsing saved spots. The app prioritizes low-friction capture, local persistence (no server required), and light-weight discovery.

## Goals

- Primary: Let users rapidly capture and rediscover short, location-tied restaurant recommendations.
- Secondary: Provide a compact map view and a shareable mental model of visited/recommended places.

## Target users

- Friends or small groups who keep a private/shared micro-journal of local restaurants.
- Individuals who want a low-friction place to store memorable recommendations.

## MVP Features

1. Identity-first landing: Persona selection on first-run saved to `sessionStorage`.
2. Add Spot modal: Form fields for name, location, cuisine, recommendation, optional vibe/price, would-go-again. Geocode on save.
3. Feed view: Reverse-chronological cards showing name, owner, snippet, tags, and timestamp. (Removed the 'Add more spots' prompt.)
4. Map view: Leaflet map with pins for cards that have coordinates; clicking a pin opens an inline popup card.
5. Persistence: Save/load cards in `localStorage` under `spoonfed-cards`; user identity in `spoonfed-user`.
6. Coordinate backfill: On app load, geocode older saved cards missing coordinates and update storage.
7. Map links: Build external maps URLs from card fields so users can open locations in maps sites.

## UX Flow

- Landing: user selects a persona, then sees the main app.
- Main: header with current persona and `+ Add Spot` button; map/feed toggle.
- Add Spot: modal (full-height on mobile, centered on desktop) with form; on submit, geocode and save; show toast on success.
- Map: pins represent cards; selecting a pin opens a popup card; popup contains a clickable maps link.

## Data Model

- `RestaurantCard` (client):
  - `id`: string
  - `addedBy`: string (persona)
  - `restaurantName`: string
  - `location`: string
  - `mapsUrl`: string
  - `coordinates?`: { lat: number; lng: number } | null
  - `cuisine`: string
  - `recommendation`: string
  - `vibe?`: string | null
  - `priceRange?`: string | null
  - `wouldGoAgain?`: boolean | null
  - `dateAdded`: ISO string

## Tech & Integrations

- Frontend: Vite + React + TypeScript
- Styling: Tailwind CSS
- Maps: Leaflet + react-leaflet
- Geocoding: Nominatim (OpenStreetMap) via a shared `geocodeLocation` helper
- Storage: `localStorage` for cards; `sessionStorage` for identity

## Non-functional Requirements

- Performance: keep production bundle small; lazy-load map tiles.
- Privacy: default local-only storage; inform users about geocoding requests to Nominatim.
- Resilience: gracefully save cards even if geocoding fails; backfill coordinates later.
- Accessibility: keyboard-close modal and semantic elements with readable contrast.

## Success Metrics

- Capture rate: % of sessions that add >= 1 card within first use.
- Map coverage: % of cards with coordinates after backfill.
- Retention: % of users returning within 7 days (proxy via local/session storage behavior).

## Risks & Constraints

- Nominatim has rate limits and usage policy; heavy usage needs a paid geocoding provider or caching.
- Client-only persistence prevents cross-device sync without a backend.
- Map popup/modal stacking requires careful CSS z-index management (see `src/index.css`).

## Roadmap / Milestones (suggested)

1. Finalize PRD and README (done).
2. Polish Add Spot modal UX and map stacking behavior (current work).
3. Add export/import JSON for cards (week 2).
4. Prototype lightweight sync (e.g., GitHub Gist or optional small backend) (week 3+).

## Open questions

- Do you want cross-device sync now or keep client-only?  
- Preferred default main view: Map or Feed?  

---

If you'd like, I can: 1) commit this PRD to `docs/PRD.md` (already staged next), and 2) open issues for the open questions.
