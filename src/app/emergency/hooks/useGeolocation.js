import { useEffect, useRef, useState } from "react";

// HIGH_ACCURACY_OPTS requests the most precise fix available with a 10-second timeout and no cached position
const HIGH_ACCURACY_OPTS = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

// useGeolocation subscribes to the browser's geolocation watch and surfaces the latest coords as React state.
// The onPosition callback is stored in a ref so the watch doesn't need to re-register on every render.
export function useGeolocation({ email, onPosition }) {
  const [coords, setCoords] = useState(null);
  const watchIdRef = useRef(null);
  const onPositionRef = useRef(onPosition);

  // keep the ref current without re-triggering the watch effect
  useEffect(() => {
    onPositionRef.current = onPosition;
  });

  useEffect(() => {
    if (!email || !("geolocation" in navigator)) return;

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const point = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCoords(point);
        onPositionRef.current?.(point);
      },
      (err) => console.error("Location watch error:", err),
      HIGH_ACCURACY_OPTS
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [email]);

  return { coords, setCoords };
}

// getLiveCoords does a one-shot position read — used when an action needs coords immediately
// before the continuous watcher has produced its first fix
export function getLiveCoords() {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Geolocation not supported."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      reject,
      HIGH_ACCURACY_OPTS
    );
  });
}
