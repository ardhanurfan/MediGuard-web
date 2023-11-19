import { useState } from "react";
import MapComponent from "../../components/GoogleMaps/GoogleMaps";

function Map() {
  interface Marker {
    lat: number;
    lng: number;
  }

  const [markers] = useState<Marker[]>([
    { lat: -6.2088, lng: 106.8456 },
    { lat: -6.2088, lng: 106.8456 },
    { lat: -6.22, lng: 106.85 },
  ]);

  return (
    <>
      <div className="min-h-screen w-full bg-kBlue-100 xl:pl-[240px] pt-16 pl-0">
        <MapComponent markers={markers} />
      </div>
    </>
  );
}

export default Map;
