import { divIcon } from 'leaflet'

export function createMapPinIcon(color: string) {
  return divIcon({
    className: '',
    html: `
      <div style="
        width: 18px;
        height: 18px;
        border-radius: 999px;
        background: ${color};
        border: 3px solid white;
        box-shadow: 0 6px 14px rgba(26, 26, 26, 0.28);
      "></div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 18],
    popupAnchor: [0, -18],
  })
}