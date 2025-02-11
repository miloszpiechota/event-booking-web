// src/components/MapPicker.tsx
import React from "react";
import { Marker, useMapEvents } from "react-leaflet";

interface MapPickerProps {
  position: { lat: number; lng: number };
  onPositionChange: (newPos: { lat: number; lng: number }) => void;
}

const MapPicker: React.FC<MapPickerProps> = ({ position, onPositionChange }) => {
  useMapEvents({
    click(e) {
      onPositionChange(e.latlng);
    },
  });

  return (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const newPos = e.target.getLatLng();
          onPositionChange(newPos);
        },
      }}
    />
  );
};

export default MapPicker;
