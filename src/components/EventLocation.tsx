import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const EventLocation = ({ event }) => {
  const { latitude, longitude } = event.location;

  // Ustawienia mapy
  const center = [latitude, longitude];

  return (
    <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold">Event Location</h2>

      {/* Mapa OpenStreetMap */}
      <MapContainer
        center={center}
        zoom={15}
        style={{ width: "100%", height: "200px", borderRadius: "8px" }}
      >
        {/* Warstwa mapy (OpenStreetMap) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Marker wskazujący lokalizację */}
        <Marker position={center} icon={new L.Icon({ iconUrl: require('leaflet/dist/images/marker-icon.png') })}>
          <Popup>{event.location.full_address}</Popup>
        </Marker>
      </MapContainer>

      {/* Adres wydarzenia */}
      <p className="text-gray-700 mt-4">{event.location.full_address}</p>
    </div>
  );
};

export default EventLocation;
