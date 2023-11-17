const apiKey = "AIzaSyDuTisit6x-u0A11_YhB6v05CFFQEmPjsk";

import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScript,
} from "@react-google-maps/api";

interface MapProps {
  markers: { lat: number; lng: number }[];
}

const MapComponent: React.FC<MapProps> = ({ markers }) => {
  const [selectedMarker, setSelectedMarker] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ height: "91vh", width: "100%" }}
        center={{ lat: -6.2088, lng: 106.8456 }}
        zoom={10}
        options={{
          draggable: true,
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "./assets/myloc.svg",
            }}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.lat,
              lng: selectedMarker.lng,
            }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h3>{`Marker ${selectedMarker.lat}, ${selectedMarker.lng}`}</h3>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
