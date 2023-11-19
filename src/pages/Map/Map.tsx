import { useEffect, useState } from "react";
import MapComponent from "../../components/GoogleMaps/GoogleMaps";
import useSocket from "../../api/socket";
import { getWithAuth } from "../../api/api";
import Cookies from "js-cookie";
import { toastError } from "../../components/Toast/Toast";

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

function Map() {
  const token = Cookies.get("token_mediguard");
  const socket = useSocket();
  const [dataUnits, setDataUnits] = useState<Unit[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to server");
      });

      socket.on("dataUnits", (data) => {
        console.log("Received message:", data);
        var dataUnit = data as Unit[];
        setDataUnits(dataUnit);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    }

    // Membersihkan listener saat komponen di-unmount
    return () => {
      if (socket) {
        socket.off("dataUnits");
      }
    };
  }, [socket]);

  const getMediguards = async () => {
    if (token) {
      try {
        const response = await getWithAuth(token, "unit/get-on-going");
        const data = response.data?.data as Unit[];
        setDataUnits(data);
      } catch (error) {
        toastError("Get MediGuards Failed");
      }
    }
  };

  useEffect(() => {
    getMediguards();
  }, []);

  return (
    <>
      <div className="min-h-screen w-full bg-kBlue-100 xl:pl-[240px] pt-16 pl-0">
        <MapComponent units={dataUnits} />
      </div>
    </>
  );
}

export default Map;
