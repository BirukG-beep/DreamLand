import { useEffect, useState } from "react";

type LatLng = [number, number];

export function useUserLocation() {
  const [location, setLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation([
          pos.coords.latitude,
          pos.coords.longitude,
        ]);
      },
      (err) => {
        console.error("Location error:", err);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  return location;
}