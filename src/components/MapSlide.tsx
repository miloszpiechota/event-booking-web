import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEvents } from "../../context/EventContext.tsx";
import customMarkerIcon from "../assets/location.png";
import { useNavigate } from "react-router-dom";

const customIcon = new L.Icon({
  iconUrl: customMarkerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Calculate distance using Haversine formula
const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const MapSlide = () => {
  const { events, loading } = useEvents();
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const [nearestEvents, setNearestEvents] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        }),
      () => console.error("Nie udało się pobrać lokalizacji użytkownika")
    );
  }, []);

  useEffect(() => {
    if (userLocation && events.length > 0) {
      const sorted = [...events].sort((a, b) => {
        const dA = getDistance(
          userLocation.lat,
          userLocation.lon,
          a.location.latitude,
          a.location.longitude
        );
        const dB = getDistance(
          userLocation.lat,
          userLocation.lon,
          b.location.latitude,
          b.location.longitude
        );
        return dA - dB;
      });
      setNearestEvents(sorted.slice(0, 4));
    }
  }, [userLocation, events]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6 bg-black/40 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
        <div className="relative w-full md:w-2/3 min-h-[400px] p-4">
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/10 backdrop-blur-md bg-black/20">
            <MapContainer
              center={[52.2298, 21.0122]}
              zoom={5}
              className="w-full h-[100%]"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {loading ? (
                <p className="text-center text-white">Loading events...</p>
              ) : (
                events.map((event) => (
                  <Marker
                    key={event.id}
                    position={[
                      event.location.latitude,
                      event.location.longitude,
                    ]}
                    icon={customIcon}
                  >
                    <Popup>
                      <strong>{event.name}</strong>
                      <br />
                      📍 {event.location.city_name}
                    </Popup>
                  </Marker>
                ))
              )}
            </MapContainer>
          </div>
        </div>

        {/* Events near you */}
        <div className="w-full md:w-1/3 bg-gradient-to-b from-black via-gray-900 to-black text-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-center">
            Events Near You
          </h2>
          {nearestEvents.length === 0 ? (
            <p className="text-sm text-gray-300 text-center justify-center">
              No events nearby...
            </p>
          ) : (
            <div className="flex flex-col space-y-3">
              {nearestEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => navigate(`/event/${event.id}`)}
                  className="cursor-pointer bg-gray-800/60 hover:bg-gray-700/80 transition duration-200 p-4 rounded-xl shadow hover:scale-[1.02]"
                >
                  <h3 className="text-sm font-semibold">{event.name}</h3>
                  <p className="text-xs text-gray-400">
                    📍 {event.location.city_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    📏{" "}
                    {getDistance(
                      userLocation.lat,
                      userLocation.lon,
                      event.location.latitude,
                      event.location.longitude
                    ).toFixed(1)}{" "}
                    km
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapSlide;
