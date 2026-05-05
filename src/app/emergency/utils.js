// prettify converts snake_case strings (e.g. "rider_responding") to title case ("Rider Responding")
export function prettify(value) {
  return String(value || "")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

// isClosedStatus returns true for terminal statuses that can no longer be acted on
export function isClosedStatus(status) {
  return status === "resolved" || status === "cancelled";
}

// markerColorForIncident maps an incident's status to the Mapbox marker colour:
//   red   = waiting for help
//   green = a helper is on the way
//   amber = helper has arrived / receiving assistance
//   grey  = closed
export function markerColorForIncident(status) {
  if (status === "reported" || status === "dispatching") return "#ef4444";
  if (status === "rider_responding" || status === "help_on_the_way") return "#22c55e";
  if (status === "assistance_received") return "#f59e0b";
  if (status === "resolved" || status === "cancelled") return "#9ca3af";
  return "#ef4444";
}

// formatTime safely converts a date value to a locale string, returning "—" when the value is missing or invalid
export function formatTime(dateValue) {
  if (!dateValue) return "—";
  try {
    return new Date(dateValue).toLocaleString();
  } catch {
    return "—";
  }
}

// haversineKm calculates the great-circle distance in km between two lat/lng points — used for "X km away" badges on incidents and nearby riders
export function haversineKm(a, b) {
  if (!a || !b) return null;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

// popupBtnStyle returns an inline style string for buttons injected into Mapbox popup HTML
// Bootstrap classes don't apply inside the popup's separate DOM tree, so styles are inlined
export function popupBtnStyle(background) {
  return `background:${background};color:white;border:none;border-radius:8px;padding:8px 10px;cursor:pointer;font-weight:700;width:100%;`;
}
