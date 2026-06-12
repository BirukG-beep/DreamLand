"use client";

import { useRouter } from "next/navigation";
import Footer from "@/app/components/Home/Footer";
import { useEffect, useState } from "react";
import { useUserLocation } from "@/app/hooks/useCurrentLocation";
import { getRoute } from "@/app/lib/getRoute";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";


/* ---------------- TYPES ---------------- */
type RouteInfo = {
  distance: number;
  durationCar: number;
  durationWalk: number;
};

const DESTINATION: [number, number] = [
  8.749266809256277,
  38.970718331002935,
];

/* ---------------- COMPONENT ---------------- */
export default function Map() {
  const router = useRouter();
  const userLocation = useUserLocation();
  const [routeGeoJson, setRouteGeoJson] = useState<any>(null);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);

  /* ---------------- FETCH ROUTE ---------------- */
  useEffect(() => {
    if (!userLocation) return;

    const loadRoute = async () => {
      try {
        const data = await getRoute(userLocation, DESTINATION);

        setRouteGeoJson(data);

        // ORS / GeoJSON safe parsing
        const feature = data?.features?.[0];
        const props = feature?.properties || {};

        const distanceKm = (props.summary?.distance || 0) / 1000;
        const durationSec = props.summary?.duration || 0;

        setRouteInfo({
          distance: Number(distanceKm.toFixed(2)),
          durationCar: Math.round(durationSec / 60),
          durationWalk: Math.round((distanceKm / 5) * 60),
        });
      } catch (err) {
        console.error("Route error:", err);
      }
    };

    loadRoute();
  }, [userLocation]);


  
/* ---------------- FIX LEAFLET ICON (SAFE) ---------------- */
useEffect(() => {
  import("leaflet").then((L) => {
    delete (L.default.Icon.Default.prototype as any)._getIconUrl;

    L.default.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl:
        "/logo.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  });
}, []);



  return (
    <>
      {/* PAGE WRAPPER */}
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        {/* NAVBAR */}
        <nav className="nav">
          <div className="nav-inner">
            <div className="logo">DreamLand</div>

            <div>
              <button className="btn" onClick={() => router.push("/")}>
                Home
              </button>
              <button className="btn btn-primary" onClick={() => router.push("/contact")}>
                Contact
              </button>
            </div>
          </div>
        </nav>

        <div style={{ height: "60px" }} />

        {/* MAP */}
        <div style={{ flex: 1, position: "relative" }}>
          <MapContainer
            center={DESTINATION}
            zoom={14}
            style={{ height: "70vh", width: "100%" }}
            scrollWheelZoom={false}
            dragging={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            {/* USER */}
            {userLocation && (
              <Marker position={userLocation}>
                <Popup>Start (You)</Popup>
              </Marker>
            )}

            {/* DESTINATION */}
            <Marker position={DESTINATION}>
              <Popup>Destination</Popup>
            </Marker>

            {/* ROUTE */}
            {routeGeoJson && (
              <GeoJSON
                data={routeGeoJson}
                style={{
                  color: "#a8895f",
                  weight: 6,
                  opacity: 0.9,
                }}
              />
            )}
          </MapContainer>

          {/* INFO PANEL */}
          {routeInfo && (
            <div className="info-box">
              <h3>Route Info</h3>
              <p>Distance: {routeInfo.distance} km</p>
              <p>Car: {routeInfo.durationCar} min</p>
              <p>Walk: {routeInfo.durationWalk} min</p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <Footer />
      </div>

      {/* STYLES */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');
        
             
        
        body{
         margin:0;
       }
        .nav {
          position: fixed;
          top: 0;
          width: 100%;
          background: rgba(255,255,255,0.9);
          z-index: 2000;
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(180,140,80,0.15);
        }

        .nav-inner {
          display: flex;
          justify-content: space-between;
          padding: 1rem 2rem;
          color: #1a1814;
        }

        .logo {
          color: #1a1814;
          letter-spacing: 0.3em;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
        }

        .btn {
          margin-left: 10px;
          padding: 8px 16px;
          border-radius: 999px;
          border: 1px solid #a8895f;
          background: transparent;
          color: #1a1814;
        }

        .btn-primary {
          background: #a8895f;
          color: white;
        }

        .info-box {
          font-family: 'Cormorant Garamond', serif;
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(255,255,255,0.95);
          color: #1a1814;
          padding: 16px;
          border-radius: 12px;
          z-index: 1000;
          border: 1px solid rgba(180,140,80,0.15);
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }
      `}</style>
    </>
  );
}