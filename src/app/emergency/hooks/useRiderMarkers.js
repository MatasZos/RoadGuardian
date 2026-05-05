import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { haversineKm } from "../utils";
import { buildRiderPopupHTML } from "../popups";

// useRiderMarkers places or moves Mapbox markers for nearby riders who have enabled live location sharing.
// Riders who currently have an active emergency are filtered out — their incident marker takes priority.
export function useRiderMarkers({
  mapRef,
  markersRef,
  riders,
  activeIncidents,
  coords,
  email,
  onDrawRoute,
  onMessageUser,
}) {
  useEffect(() => {
    if (!mapRef.current) return;

    // build a set of emails that already have an incident marker so we can skip them
    const incidentEmails = new Set(activeIncidents.map((i) => i.userEmail));
    const seenIds = new Set();

    riders.forEach((rider) => {
      // skip riders who haven't enabled sharing, the current user, or riders with an active incident
      if (!rider?.enabled || rider.userEmail === email) return;
      if (incidentEmails.has(rider.userEmail)) return;
      if (typeof rider.lat !== "number" || typeof rider.lng !== "number") return;

      const id = String(rider._id);
      seenIds.add(id);

      const distanceKm = coords
        ? haversineKm(coords, { lat: rider.lat, lng: rider.lng })
        : null;

      // if the marker already exists just move it rather than recreating it
      if (markersRef.current[id]) {
        markersRef.current[id].setLngLat([rider.lng, rider.lat]);
        return;
      }

      const popup = new mapboxgl.Popup().setHTML(
        buildRiderPopupHTML({ rider, distanceKm })
      );
      const marker = new mapboxgl.Marker({ color: "#3b82f6" })
        .setLngLat([rider.lng, rider.lat])
        .setPopup(popup)
        .addTo(mapRef.current);

      // bind button handlers after the popup mounts to the DOM
      popup.on("open", () =>
        setTimeout(() => {
          const el = popup.getElement();
          if (!el) return;

          const routeBtn = el.querySelector(".route-rider-btn");
          const chatBtn = el.querySelector(".chat-rider-btn");

          if (routeBtn) {
            routeBtn.onclick = () => onDrawRoute(rider.lng, rider.lat);
          }
          if (chatBtn) {
            chatBtn.onclick = () =>
              onMessageUser(
                rider.userEmail,
                "Hey, I can see you nearby on the map.",
                null
              );
          }
        }, 0)
      );

      markersRef.current[id] = marker;
    });

    // remove markers for riders who are no longer in the live-location list
    Object.keys(markersRef.current).forEach((id) => {
      if (!seenIds.has(id)) {
        markersRef.current[id].remove();
        delete markersRef.current[id];
      }
    });
  }, [riders, activeIncidents, coords, email]);
}
