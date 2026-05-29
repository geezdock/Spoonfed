# Spoonfed — OurEats

A small identity-first restaurant journal built with React, TypeScript, Vite and Leaflet.

This repository contains the OurEats / Spoonfed client app used to capture short restaurant recommendations, pin them on a map, and browse a lightweight feed. The app is intentionally minimal and works entirely in the browser using localStorage for persistence and the Nominatim (OpenStreetMap) geocoding service for coordinates.

Key features

- Identity-first flow: choose a persona on first open (sessionStorage), then use the app as that user.
- Feed + Map: toggle between a feed of saved restaurant cards and a Leaflet map with pins for geocoded entries.
- Add spots: save restaurants with short recommendations, optional vibe/price/tags, and the app will geocode the provided location.
- Backfill: older saved cards without coordinates are geocoded on first load so they appear on the map.

Tech stack

- Vite + React + TypeScript
- Tailwind CSS for styling
- Leaflet + react-leaflet for maps
- Nominatim (OpenStreetMap) for geocoding

Quick start

1. Install dependencies

```powershell
npm install
```

2. Run the dev server

```powershell
npm run dev
```

Open http://127.0.0.1:5173/ in your browser.

Build for production

```powershell
npm run build
```

Lint

```powershell
npm run lint
```

Configuration notes

- There are no server components in this repo; everything runs client-side.
- Geocoding uses Nominatim. If you run this app heavily or in production, please follow the Nominatim usage policy and consider providing your own geocoding endpoint or a paid service.

Files of interest

- `src/App.tsx` — top-level routing and view state
- `src/components/MapView.tsx` — the Leaflet map and pin rendering
- `src/components/FeedView.tsx` — feed + filter UI
- `src/hooks/useRestaurants.ts` — persistence and coordinate backfill
- `src/utils/geocodeLocation.ts` — shared Nominatim helper

Contributing

Contributions are welcome. Open an issue or submit a pull request with a clear summary of changes. Keep changes focused to a single concern per PR.

License

This repository does not contain an explicit license file. If you intend to publish or share this project publicly, add a `LICENSE` file (for example, MIT) to make the terms explicit.

Support / contact

For questions about this project, open an issue on the repository.

