// useMapbox boots up the Mapbox GL instance for the emergency page and returns the refs the page needs to drop markers and draw routes

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

// DUBLIN_CENTER is the initial map centre - the apps main scope is Ireland currently
const DUBLIN_CENTER = [-6.2603, 53.3498];

// useMapbox initialises the Mapbox map, wires up follow-mode tracking, and cleans up all markers and layers on unmount
export function useMapbox({ status, chatOpen, setError, setFollowMode }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const myMarkerRef = useRef(null);
  const incidentMarkersRef = useRef({});
  const riderMarkersRef = useRef({});
  const followModeRef = useRef(true);

  useEffect(() => {
    if (status === "loading" || status === "unauthenticated") return;
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!mapboxgl.accessToken) {
      setError("Missing Mapbox token (NEXT_PUBLIC_MAPBOX_TOKEN).");
      return;
    }

    // destroy any previous map instance before creating a new one (e.g. after auth state change)
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: DUBLIN_CENTER,
      zoom: 12,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.on("load", () => map.resize());

    // once the user drags the map manually, stop chasing them with the camera
    map.on("dragstart", () => {
      followModeRef.current = false;
      setFollowMode(false);
    });

    mapRef.current = map;

    // first tile load can leave the canvas at the wrong size on slow connections
    const resizeTimer = setTimeout(() => map.resize(), 300);

    return () => {
      clearTimeout(resizeTimer);
      Object.values(incidentMarkersRef.current).forEach((m) => m.remove());
      Object.values(riderMarkersRef.current).forEach((m) => m.remove());
      incidentMarkersRef.current = {};
      riderMarkersRef.current = {};
      myMarkerRef.current?.remove();
      myMarkerRef.current = null;
      if (mapRef.current?.getLayer("route")) mapRef.current.removeLayer("route");
      if (mapRef.current?.getSource("route")) mapRef.current.removeSource("route");
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [status]);

  // when the chat sidebar slides in or out the map container changes width — nudge Mapbox to redraw at the new size
  useEffect(() => {
    if (!mapRef.current) return;
    const t = setTimeout(() => mapRef.current?.resize(), 250);
    return () => clearTimeout(t);
  }, [chatOpen]);

  return {
    mapContainerRef,
    mapRef,
    myMarkerRef,
    incidentMarkersRef,
    riderMarkersRef,
    followModeRef,
  };
}
