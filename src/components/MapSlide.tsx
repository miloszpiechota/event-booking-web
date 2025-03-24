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

// Funkcja obliczająca odległość między dwoma punktami (Haversine formula)
const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const MapSlide: React.FC = () => {
  const { events, loading } = useEvents();
  const navigate = useNavigate(); // ✅ PRZENIESIONE DO ŚRODKA KOMPONENTU!
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [nearestEvents, setNearestEvents] = useState<Event[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => console.error("Nie udało się pobrać lokalizacji użytkownika")
    );
  }, []);

  useEffect(() => {
    if (userLocation && events.length > 0) {
      const sortedEvents = [...events].sort((a, b) => {
        const distA = getDistance(
          userLocation.lat,
          userLocation.lon,
          a.location.latitude,
          a.location.longitude
        );
        const distB = getDistance(
          userLocation.lat,
          userLocation.lon,
          b.location.latitude,
          b.location.longitude
        );
        return distA - distB;
      });

      setNearestEvents(sortedEvents.slice(0, 4));
    }
  }, [userLocation, events]);

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-l-*">
      <div className="max-w-3xl w-full backdrop-blur-lg shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        <div className="relative w-full md:w-2/3 min-h-[400px] p-4 bg-black">
          <MapContainer
            center={[52.2298, 21.0122]}
            zoom={5}
            className="w-full h-full rounded-lg border-solid border-4 border-red-600"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {loading ? (
              <p className="text-center text-white">Ładowanie wydarzeń...</p>
            ) : (
              events.map((event) => (
                <Marker
                  key={event.id}
                  position={[event.location.latitude, event.location.longitude]}
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

        <div className="w-full md:w-1/3 bg-black text-white p-6 flex flex-col relative rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-3 text-center">
            Events Near You
          </h2>

          {nearestEvents.length === 0 ? (
            <p className="text-sm text-gray-200 text-center">
              Brak wydarzeń...
            </p>
          ) : (
            <div className="flex flex-col space-y-2">
              {nearestEvents.map((event) => (
                <div
                  key={event.id} 
                  onClick={() => navigate(`/event/${event.id}`)} // ✅ PRZEKIEROWANIE DZIAŁA POPRAWNIE
                  className="bg-gray-800 p-2 rounded-lg shadow-md border border-gray-700 flex flex-col items-center text-center cursor-pointer hover:bg-gray-800 transition duration-200"
                >
                  <h3 className="text-sm font-semibold">{event.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    📍 {event.location.city_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    📏 {getDistance(
                      userLocation!.lat,
                      userLocation!.lon,
                      event.location.latitude,
                      event.location.longitude
                    ).toFixed(1)} km
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
