"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

interface MapProps {
  fromLat: number;
  fromLon: number;
  toLat: number;
  toLon: number;
}

const LeafletMap: React.FC<MapProps> = ({ fromLat, fromLon, toLat, toLon }) => {
  const mapRef = useRef<L.Map | null>(null);
  //@ts-ignore
  const routingRef = useRef<L.Routing.Control | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // **Destroy Existing Map If Present**
    if (mapRef.current) {
      mapRef.current.remove(); // Remove map instance
      mapRef.current = null; // Reset ref
    }

    // **Initialize New Map**
    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
    }).setView([fromLat, fromLon], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; Uttarakhand Tour & Travels",
    }).addTo(map);

    // **Add Markers**
    const createMarker = (
      lat: number,
      lon: number,
      label: string,
      color: string
    ) =>
      L.marker([lat, lon], {
        icon: L.divIcon({
          className: "custom-marker",
          html: `<div style="
            background-color: ${color}; 
            color: white; 
            font-weight: bold; 
            border-radius: 15px; 
            padding: 5px 10px;
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-size: 14px;
            border: 2px solid white;
            box-shadow: 0 0 6px rgba(0,0,0,0.3);
            white-space: nowrap;
          ">${label}</div>`,
          iconSize: [50, 25],
          iconAnchor: [25, 25],
        }),
      }).addTo(map);

    createMarker(fromLat, fromLon, "Start", "#007bff");
    createMarker(toLat, toLon, "End", "#dc3545");

    // **Remove Existing Routing Control If Present**
    if (routingRef.current) {
      map.removeControl(routingRef.current); // Remove old route
      routingRef.current = null;
    }

    // **Initialize Routing**
    //@ts-ignore
    routingRef.current = L.Routing.control({
      waypoints: [L.latLng(fromLat, fromLon), L.latLng(toLat, toLon)],
      routeWhileDragging: true,
      lineOptions: { styles: [{ color: "blue", weight: 4 }] },
      createMarker: () => null,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
    }).addTo(map);

    // **Save map instance**
    mapRef.current = map;

    return () => {
      // **Clean Up on Unmount**
      if (mapRef.current) {
        mapRef.current.off(); // Remove all event listeners
        mapRef.current.remove(); // Destroy map
        mapRef.current = null;
      }
      if (routingRef.current) {
        routingRef.current = null;
      }
    };
  }, [fromLat, fromLon, toLat, toLon]);

  return <div ref={mapContainerRef} className="h-full w-full" />;
};

export default LeafletMap;
