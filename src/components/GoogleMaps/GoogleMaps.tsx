const apiKey = import.meta.env.VITE_GOOGLE_MAP_KEY;

import { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScript,
} from "@react-google-maps/api";

interface DeliveryCat {
  kateogriPengiriman: string;
  suhuSimpan: string;
  minSuhu: number;
  maxSuhu: number;
}

interface TransactionUnit {
  orderNum: number;
  distance: number | null;
  timeEstimation: number | null;
  deliveryCat: DeliveryCat;
}

interface Unit {
  orderNum: number[];
  unitId: string;
  batteryCapacity: number;
  currentState: boolean;
  temperature: number;
  longitude: number;
  latitude: number;
  humidity: number;
  currentTransaction: number | null;
  transactionUnits: TransactionUnit[];
}

const MapComponent = ({ units }: { units: Unit[] }) => {
  const [selectedMarker, setSelectedMarker] = useState<Unit | null>(null);
  const [center, setCenter] = useState({ lat: -6.2088, lng: 106.8456 });

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ height: "91vh", width: "100%" }}
        center={center}
        zoom={10}
        options={{
          draggable: true,
        }}
      >
        {units.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            icon={{
              url: "./assets/myloc.svg",
            }}
            onClick={() => {
              setSelectedMarker(marker);
              setCenter({ lat: marker.latitude, lng: marker.longitude });
            }}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.latitude,
              lng: selectedMarker.longitude,
            }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h3 className="text-[12px] font-semibold text-kBlue-400">{`Unit ${selectedMarker.unitId}`}</h3>
              <h3 className="font-semibold text-kBlue-400 mb-2">{`Deliver to ${selectedMarker.currentTransaction}`}</h3>
              {selectedMarker.transactionUnits
                .filter(
                  (val) => val.orderNum == selectedMarker.currentTransaction
                )
                .map((transaction: TransactionUnit) => (
                  <div
                    className={`w-[15%] font-bold ${
                      selectedMarker.temperature >
                      transaction.deliveryCat.maxSuhu
                        ? "text-kRed"
                        : selectedMarker.temperature <
                          transaction.deliveryCat.minSuhu
                        ? "text-kRed"
                        : "text-kGreen-200"
                    }`}
                  >
                    {selectedMarker.temperature >
                    transaction.deliveryCat.maxSuhu
                      ? "Over Temperature"
                      : selectedMarker.temperature <
                        transaction.deliveryCat.minSuhu
                      ? "Under Temperature"
                      : "Safe"}
                  </div>
                ))}
              <h3 className="font-semibold text-kBlue-300 mt-2">{`Humidity ${selectedMarker.humidity}%`}</h3>
              <h3 className="font-semibold text-kBlue-300 mb-2">{`Temperature ${selectedMarker.temperature}°C`}</h3>
              <h3>{`lat ${selectedMarker.latitude}, long ${selectedMarker.longitude}`}</h3>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
