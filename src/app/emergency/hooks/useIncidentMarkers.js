import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { haversineKm, markerColorForIncident } from "../utils";
import { buildIncidentPopupHTML } from "../popups";

// useIncidentMarkers places or moves a Mapbox marker for each active incident and wires up the action buttons inside each popup
export function useIncidentMarkers({
  mapRef,
  markersRef,
  incidents,
  coords,
  email,
  onUpdateIncident,
  onDrawRoute,
  onMessageUser,
}) {
  useEffect(() => {
    if (!mapRef.current) return;

    const seenIds = new Set();

    incidents.forEach((incident) => {
      if (typeof incident.lat !== "number" || typeof incident.lng !== "number") {
        return;
      }

      const id = String(incident._id);
      const isMine = incident.userEmail === email;
      seenIds.add(id);

      const distanceKm = coords
        ? haversineKm(coords, { lat: incident.lat, lng: incident.lng })
        : null;

      const popupHtml = buildIncidentPopupHTML({
        incident,
        viewerEmail: email,
        distanceKm,
      });

      // if the marker already exists just move it — avoids recreating DOM and re-binding handlers
      if (markersRef.current[id]) {
        markersRef.current[id].setLngLat([incident.lng, incident.lat]);
        return;
      }

      const popup = new mapboxgl.Popup().setHTML(popupHtml);
      const marker = new mapboxgl.Marker({
        // own incidents use orange so the reporter can instantly spot their pin
        color: isMine ? "#f97316" : markerColorForIncident(incident.status),
      })
        .setLngLat([incident.lng, incident.lat])
        .setPopup(popup)
        .addTo(mapRef.current);

      // bind popup button handlers after it mounts — setTimeout(0) defers until the HTML is in the DOM
      popup.on("open", () =>
        setTimeout(() => {
          const el = popup.getElement();
          if (!el) return;

          const on = (cls, fn) => {
            const btn = el.querySelector(cls);
            if (btn) btn.onclick = fn;
          };

          on(".claim-help-btn", () => onUpdateIncident(id, "claim-help"));
          on(".route-incident-btn", async () => {
            await onDrawRoute(incident.lng, incident.lat);
            await onUpdateIncident(id, "route-started");
          });
          on(".chat-incident-btn", () =>
            onMessageUser(
              incident.userEmail,
              "Hi, I saw your emergency. I'm nearby.",
              incident
            )
          );
          on(".cancel-incident-btn", () => onUpdateIncident(id, "cancel"));
          on(".resolve-incident-btn", () => onUpdateIncident(id, "resolve"));
          on(".route-started-btn", async () => {
            await onDrawRoute(incident.lng, incident.lat);
            await onUpdateIncident(id, "route-started");
          });
          on(".arrived-btn", () => onUpdateIncident(id, "arrived"));
        }, 0)
      );

      markersRef.current[id] = marker;
    });

    // remove markers for incidents that are no longer in the active list
    Object.keys(markersRef.current).forEach((id) => {
      if (!seenIds.has(id)) {
        markersRef.current[id].remove();
        delete markersRef.current[id];
      }
    });
  }, [incidents, coords, email]);
}
