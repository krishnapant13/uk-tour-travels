"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  // @ts-expect-error: This error occurs due to a missing type definition in the library
  const routingRef = useRef<L.Routing.Control | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // **Debounced map initialization to prevent re-rendering**
  const initializeMap = useCallback(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      // **Create Map Once**
      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        scrollWheelZoom: true,
      }).setView([fromLat, fromLon], 10);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; Uttarakhand Tour & Travels",
      }).addTo(map);

      mapRef.current = map;
    } else {
      // **Smoothly pan to new location**
      mapRef.current.panTo([fromLat, fromLon]);
    }

    // **Add Markers**
    const addMarker = (
      lat: number,
      lon: number,
      label: string,
      color: string
    ) => {
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
      }).addTo(mapRef.current!);
    };

    addMarker(fromLat, fromLon, "Start", "#007bff");
    addMarker(toLat, toLon, "End", "#dc3545");

    setIsMapLoaded(true);
  }, [fromLat, fromLon, toLat, toLon]);

  // **Efficient Route Initialization**
  const initializeRoute = useCallback(() => {
    if (!mapRef.current || !isMapLoaded) return;

    // Remove previous route if exists
    if (routingRef.current) {
      mapRef.current.removeControl(routingRef.current);
      routingRef.current = null;
    }

    // @ts-expect-error: This error occurs due to a missing type definition in the library
    routingRef.current = L.Routing.control({
      waypoints: [L.latLng(fromLat, fromLon), L.latLng(toLat, toLon)],
      routeWhileDragging: false,
      lineOptions: { styles: [{ color: "blue", weight: 4 }] },
      createMarker: () => null,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
    }).addTo(mapRef.current);
  }, [fromLat, fromLon, toLat, toLon, isMapLoaded]);

  useEffect(() => {
    initializeMap();
  }, [initializeMap]);

  useEffect(() => {
    if (isMapLoaded) {
      initializeRoute();
    }
  }, [initializeRoute, isMapLoaded]);

  useEffect(() => {
    return () => {
      // **Clean Up on Unmount**
      if (mapRef.current) {
        mapRef.current.off();
        mapRef.current.remove();
        mapRef.current = null;
      }
      if (routingRef.current) {
        routingRef.current = null;
      }
    };
  }, []);

  return <div ref={mapContainerRef} className="h-full w-full" />;
};

export default LeafletMap;
