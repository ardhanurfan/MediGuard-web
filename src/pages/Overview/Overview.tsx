import DistributedCard from "./DistributedCard";
import { IoIosCloseCircleOutline } from "react-icons/io";
import GaugeComponent from "react-gauge-component";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import useSocket from "../../api/socket";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getWithAuth } from "../../api/api";
import { toastError } from "../../components/Toast/Toast";

interface Unit {
  orderNum: number[];
  _id: string;
  unitId: string;
  type: string;
  batteryCapacity: number;
  currentState: boolean;
  lockState: boolean;
  temperature: number;
  longitude: number;
  latitude: number;
  humidity: number;
}

function Overview() {
  const token = Cookies.get("token_mediguard");
  const socket = useSocket();
  const [average, setAverage] = useState<{
    temperature: number;
    humidity: number;
  }>({ temperature: 0, humidity: 0 });

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to server");
      });

      // Mendengarkan event 'message' dari server
      socket.on("dataUnits", (data) => {
        console.log("Received message:", data);
        var dataUnit = data as Unit[];
        var tot_humidity = 0;
        var tot_temperature = 0;
        dataUnit.forEach((unit: Unit) => {
          tot_temperature += unit.temperature;
          tot_humidity += unit.humidity;
        });
        setAverage({
          temperature: tot_temperature / dataUnit.length,
          humidity: tot_humidity / dataUnit.length,
        });
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

  const [mediGuards, setMediGuards] = useState<Unit[]>([]);
  const getMediguards = async () => {
    if (token) {
      try {
        const response = await getWithAuth(token, "unit/get-on-going");
        const data = response.data?.data as Unit[];
        setMediGuards(data);
        var tot_humidity = 0;
        var tot_temperature = 0;
        data.forEach((unit: Unit) => {
          tot_temperature += unit.temperature;
          tot_humidity += unit.humidity;
        });
        setAverage({
          temperature: tot_temperature / data.length,
          humidity: tot_humidity / data.length,
        });
      } catch (error) {
        toastError("Get MediGuards Failed");
      }
    }
  };

  useEffect(() => {
    getMediguards();
  }, []);

  const dataDummy = [
    {
      id: 1,
      Name: "PCK000000-01",
      TransportCode: "B 1992 MD",
      DeaprtureTime: "16 August 2023",
      Status: "On Going",
      Amount: 1234,
    },
    {
      id: 1,
      Name: "PCK000000-01",
      TransportCode: "B 1992 MD",
      DeaprtureTime: "16 August 2023",
      Status: "On Going",
      Amount: 1234,
    },
    {
      id: 1,
      Name: "PCK000000-01",
      TransportCode: "B 1992 MD",
      DeaprtureTime: "16 August 2023",
      Status: "On Stop",
      Amount: 1234,
    },
    {
      id: 1,
      Name: "PCK000000-01",
      TransportCode: "B 1992 MD",
      DeaprtureTime: "16 August 2023",
      Status: "On Stop",
      Amount: 1234,
    },
    {
      id: 1,
      Name: "PCK000000-01",
      TransportCode: "B 1992 MD",
      DeaprtureTime: "16 August 2023",
      Status: "Paused",
      Amount: 1234,
    },
    {
      id: 1,
      Name: "PCK000000-01",
      TransportCode: "B 1992 MD",
      DeaprtureTime: "16 August 2023",
      Status: "Paused",
      Amount: 1234,
    },
  ];

  return (
    <>
      <div className="min-h-screen w-full bg-kBlue-100 xl:pl-[240px] pt-16 pl-0">
        <div className="w-full xl:p-6 p-3">
          <div className="flex-col-reverse xl:flex-row flex xl:gap-6 gap-3">
            <div className="w-full xl:gap-6 gap-3">
              <div className="flex flex-col md:flex-row xl:gap-6 gap-3 xl:mb-6 mb-3">
                <DistributedCard
                  title={"On Distributed"}
                  value={mediGuards.length}
                  unit={"MediGuard"}
                />
                <DistributedCard
                  title={"To-be Distributed"}
                  value={145}
                  unit={"Packs"}
                />
              </div>
              <div className="w-full bg-white rounded-xl p-6">
                <Table
                  data={dataDummy}
                  column={[
                    "Name",
                    "Transport Code",
                    "Departure Time",
                    "Status",
                    "Amount",
                  ]}
                  isLoading={false}
                  type={"active"}
                />
                <div className="flex justify-end mt-8">
                  <Button text={"See All"} type={undefined} />
                </div>
              </div>
            </div>
            <div className="w-full xl:w-[380px] bg-white rounded-xl p-6">
              <h3 className="text-[16px] font-medium text-kBlue-400">
                Live Report
              </h3>
              <div className="border-kRed border-opacity-20 border-2 rounded-md bg-kRed bg-opacity-10 p-4 flex mt-4 gap-2">
                <div className="text-kRed text-xl">
                  <IoIosCloseCircleOutline />
                </div>
                <div>
                  <h3 className="text-[16px] font-medium text-kBlue-400">
                    2 Emergency Button(s) Report
                  </h3>
                  <p className="text-sm">
                    System detected 2 dangerous accident report by driver
                  </p>
                </div>
              </div>
              <div className="flex xl:flex-col flex-col md:flex-row">
                <div className="w-full items-center flex flex-col text-kBlue-400 mt-8">
                  <GaugeComponent
                    type="semicircle"
                    pointer={{
                      color: "#FF9053",
                      length: 0.8,
                      width: 15,
                    }}
                    arc={{
                      gradient: true,
                      colorArray: ["#33BDFE", "#F8EFE2"],
                      width: 0.3,
                      padding: 0.003,
                    }}
                    labels={{
                      valueLabel: { formatTextValue: () => " " },
                      tickLabels: {
                        type: "outer",
                        defaultTickValueConfig: {
                          formatTextValue: (value) => value + "%",
                          style: { fontSize: 8 },
                        },
                        ticks: [{ value: 25 }, { value: 50 }, { value: 75 }],
                      },
                    }}
                    value={average.humidity}
                    minValue={0}
                    maxValue={100}
                  />
                  <h2 className="text-xl text-kBlue-400">Average Kelembaban</h2>
                  <h2 className="text-[40px] text-kBlue-400 font-bold">
                    {average.humidity.toFixed(2) + "%"}
                  </h2>
                </div>
                <div className="w-full items-center flex flex-col text-kBlue-400 mt-8">
                  <GaugeComponent
                    type="semicircle"
                    pointer={{
                      color: "#FF9053",
                      length: 0.8,
                      width: 15,
                    }}
                    arc={{
                      gradient: true,
                      colorArray: ["#33BDFE", "#F8EFE2"],
                      width: 0.3,
                      padding: 0.003,
                    }}
                    labels={{
                      valueLabel: { formatTextValue: () => " " },
                      tickLabels: {
                        type: "outer",
                        defaultTickValueConfig: {
                          formatTextValue: (value) => value + "ºC",
                          style: { fontSize: 8 },
                        },
                        ticks: [{ value: 25 }, { value: 50 }, { value: 75 }],
                      },
                    }}
                    value={average.temperature}
                    minValue={0}
                    maxValue={100}
                  />
                  <h2 className="text-xl text-kBlue-400">Average Suhu</h2>
                  <h2 className="text-[40px] text-kBlue-400 font-bold">
                    {average.temperature.toFixed(2) + "°C"}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Overview;
