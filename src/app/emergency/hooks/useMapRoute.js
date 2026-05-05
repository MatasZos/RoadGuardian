import { useRef } from "react";
import mapboxgl from "mapbox-gl";
import { getLiveCoords } from "./useGeolocation";

// getBearing calculates the compass bearing in degrees from one lat/lng point to another
function getBearing(from, to) {
  const toRad = (d) => (d * Math.PI) / 180;
  const toDeg = (r) => (r * 180) / Math.PI;
  const lat1 = toRad(from.lat);
  const lon1 = toRad(from.lng);
  const lat2 = toRad(to.lat);
  const lon2 = toRad(to.lng);
  const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

// useMapRoute manages the tilt-and-track sat-nav camera and the blue driving-route line drawn on the map
export function useMapRoute({
  mapRef,
  followModeRef,
  coords,
  setCoords,
  onError,
}) {
  const lastCoordsRef = useRef(null);

  // updateDrivingCamera pans and tilts the camera to follow the user's current position when follow mode is active
  function updateDrivingCamera(lat, lng) {
    if (!mapRef.current || !followModeRef.current) return;

    const bearing = lastCoordsRef.current
      ? getBearing(lastCoordsRef.current, { lat, lng })
      : mapRef.current.getBearing();

    mapRef.current.easeTo({
      center: [lng, lat],
      zoom: 16.8,
      pitch: 65,
      bearing,
      duration: 800,
      offset: [0, 170],
      essential: true,
    });
    lastCoordsRef.current = { lat, lng };
  }

  // drawRouteToUser fetches a driving route from the Mapbox Directions API and draws it as a blue line on the map
  async function drawRouteToUser(targetLng, targetLat) {
    if (!mapRef.current) return;
    try {
      let start = coords;
      // fall back to a one-shot position read if the watcher hasn't produced a fix yet
      if (!start?.lat || !start?.lng) {
        start = await getLiveCoords();
        setCoords(start);
      }

      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
      const url =
        `https://api.mapbox.com/directions/v5/mapbox/driving/` +
        `${start.lng},${start.lat};${targetLng},${targetLat}` +
        `?geometries=geojson&overview=full&access_token=${token}`;

      const res = await fetch(url);
      const data = await res.json();
      const route = data?.routes?.[0]?.geometry;
      if (!route) {
        onError?.("Could not generate route.");
        return;
      }

      const geoJSON = { type: "Feature", properties: {}, geometry: route };
      const map = mapRef.current;
      // reuse the existing source if it exists — avoids a duplicate-source error on re-routing
      if (map.getSource("route")) {
        map.getSource("route").setData(geoJSON);
      } else {
        map.addSource("route", { type: "geojson", data: geoJSON });
        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#38bdf8", "line-width": 5, "line-opacity": 0.9 },
        });
      }

      const bounds = new mapboxgl.LngLatBounds();
      route.coordinates.forEach((c) => bounds.extend(c));
      map.fitBounds(bounds, { padding: 55 });
    } catch (err) {
      console.error("Route error:", err);
      onError?.(err.message || "Could not get your current location.");
    }
  }

  // clearRoute removes the route line and its data source from the map
  function clearRoute() {
    const map = mapRef.current;
    if (!map) return;
    if (map.getLayer("route")) map.removeLayer("route");
    if (map.getSource("route")) map.removeSource("route");
  }

  return { updateDrivingCamera, drawRouteToUser, clearRoute };
}
