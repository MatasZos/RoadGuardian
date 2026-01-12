"use client";

import * as React from "react";
import Box from "@mui/material/Box";

export default function GoogleMapAdvanced() {
  const mapRef = React.useRef(null);

  React.useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

    if (!apiKey || !mapId) {
      console.error("Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY or NEXT_PUBLIC_GOOGLE_MAP_ID");
      return;
    }

    // Prevent loading the script more than once
    const existing = document.querySelector('script[data-google-maps="advanced"]');
    if (existing) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly&libraries=marker`;
    script.async = true;
    script.defer = true;
    script.setAttribute("data-google-maps", "advanced");
    script.onload = initMap;
    document.head.appendChild(script);

    async function initMap() {
      if (!mapRef.current) return;
      if (!window.google) return;

      const { Map } = await window.google.maps.importLibrary("maps");
      const { AdvancedMarkerElement, PinElement } =
        await window.google.maps.importLibrary("marker");

      const center = { lat: 53.3911, lng: 6.1677 }; 

      const map = new Map(mapRef.current, {
        center,
        zoom: 13,
        mapId,
        disableDefaultUI: true,
        zoomControl: true,
      });

      // 3 markers: User plus other users on the road
      const riders = [
        { label: "You", position: center, color: "#1976d2" },
        { label: "Rider A", position: { lat: 53.355, lng: -6.265 }, color: "#2e7d32" },
        { label: "Rider B", position: { lat: 53.345, lng: -6.255 }, color: "#d32f2f" },
      ];

      riders.forEach((r) => {
        const pin = new PinElement({
          background: r.color,
          borderColor: "#000",
          glyphColor: "#fff",
        });

        new AdvancedMarkerElement({
          map,
          position: r.position,
          title: r.label,
          content: pin.element,
        });
      });
    }
  }, []);

  return (
    <Box
      ref={mapRef}
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
      }}
    />
  );
}
