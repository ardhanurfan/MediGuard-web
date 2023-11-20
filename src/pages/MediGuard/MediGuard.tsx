import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getWithAuth } from "../../api/api";
import Cookies from "js-cookie";
import { toastError } from "../../components/Toast/Toast";
import PopUp from "../../components/PopUp/PopUp";
import Table from "../../components/Table/Table";
import useSocket from "../../api/socket";

interface ProductDetail {
  _id: string;
  prod_code: string;
  hna: number;
  het: number;
  uom: string;
  beratGram: number;
  panjangCm: number;
  lebarCm: number;
  tinggiCm: number;
  isLifeSaving: boolean;
  volumeCm3: number;
  kategoriPengiriman: number;
}

interface Address {
  alamat: string;
}

interface DeliveryCat {
  kateogriPengiriman: string;
  suhuSimpan: string;
  minSuhu: number;
  maxSuhu: number;
}

interface TransactionUnit {
  orderNum: number;
  productDetails: ProductDetail[];
  address: Address;
  distance: number | null;
  duration: number | null;
  deliveryCat: DeliveryCat;
}

interface Unit {
  unitId: string;
  batteryCapacity: number;
  temperature: number;
  humidity: number;
  platNumber: string | null;
  departureTime: string | null;
  currentTransaction: number | null;
  transactionUnits: TransactionUnit[];
}

function MediGuard() {
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to server");
      });

      // Mendengarkan event 'message' dari server
      socket.on("dataUnits", (data) => {
        console.log("Received message:", data);
        var dataUnit = data as Unit[];
        setMediGuards(dataUnit);
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

  const [detailProduct, setDetailProduct] = useState<{
    orderNum: number;
    products: ProductDetail[];
  }>();

  const [showDetailTransaction, setShowDetailTransaction] = useState<
    string | null
  >(null);
  const [showDetailProduct, setShowDetailProduct] = useState<boolean>(false);

  const [mediGuards, setMediGuards] = useState<Unit[]>([]);

  const token = Cookies.get("token_mediguard");
  const getOnGoing = async () => {
    if (token) {
      try {
        const response = await getWithAuth(token, "unit/get-on-going");
        const data = response.data?.data as Unit[];
        setMediGuards(data);
      } catch (error) {
        toastError("Get MediGuards Failed");
      }
    }
  };

  useEffect(() => {
    getOnGoing();
  }, []);

  return (
    <>
      <PopUp
        visible={showDetailProduct}
        onClose={() => setShowDetailProduct(false)}
      >
        <h1 className="text-[32px] font-semibold text-kBlue-400 mb-8">
          {detailProduct?.orderNum + " Details"}
        </h1>
        <Table
          data={detailProduct?.products.map((val: ProductDetail) => ({
            id: val._id,
            prod_code: val.prod_code,
            hna: val.hna,
            het: val.het,
            uom: val.uom,
            berat: val.beratGram,
            panjang: val.panjangCm,
            lebar: val.lebarCm,
            tinggi: val.tinggiCm,
            isLifeSaving: val.isLifeSaving ? "True" : "False",
            volume: val.volumeCm3,
            kategori: val.kategoriPengiriman,
          }))}
          column={[
            "prod_code",
            "hna",
            "het",
            "uom",
            "beratGram",
            "panjangCm",
            "lebarCm",
            "tinggiCm",
            "isLifeSaving",
            "volumeCm3",
            "kategoriPengiriman",
          ]}
          isLoading={false}
          isEdit={false}
          type={"mediguard"}
        />
      </PopUp>

      <div className="min-h-screen w-full bg-kBlue-100 xl:pl-[240px] pt-16 pl-0">
        <div className="w-full xl:p-6 p-3">
          <div className="w-full bg-white rounded-xl p-6">
            <div className="mb-6">
              <h1 className="text-[20px] font-semibold text-kBlue-400">
                On Going MediGuard
              </h1>
            </div>
            <div className="w-full">
              <div className="flex h-auto w-auto border-collapse bg-kHeadTable py-1 text-center font-medium text-[12px] text-kGrey">
                <div className="w-[5%]"></div>
                <div className="w-[15%]">MediGuard Code</div>
                <div className="w-[10%]">Plate Number</div>
                <div className="w-[20%]">Departure Time</div>
                <div className="w-[10%]">Temperature</div>
                <div className="w-[10%]">Humidity</div>
                <div className="w-[10%]">Baterai</div>
                <div className="w-[20%]">Progress</div>
              </div>
              {mediGuards.map((data) => {
                return (
                  <div key={data.unitId}>
                    <div className="flex h-auto w-auto border-collapse py-3 text-center text-[12px] text-kGrey">
                      <div
                        onClick={() => {
                          if (data.unitId == showDetailTransaction) {
                            setShowDetailTransaction(null);
                          } else {
                            setShowDetailTransaction(data.unitId);
                          }
                        }}
                        className="w-[5%] text-[24px] text-kBlue-400 flex justify-center items-center cursor-pointer hover:text-kBlue-200 active:text-kBlue-300"
                      >
                        {data.unitId == showDetailTransaction ? (
                          <IoIosArrowUp />
                        ) : (
                          <IoIosArrowDown />
                        )}
                      </div>
                      <div className="w-[15%] text-kBlue-400 font-bold flex justify-center items-center">
                        {data.unitId}
                      </div>
                      <div className="w-[10%] flex justify-center items-center">
                        {data.platNumber}
                      </div>
                      <div className="w-[20%] flex justify-center items-center">
                        {data.departureTime}
                      </div>
                      <div className="w-[10%] font-semibold text-kBlue-400 flex justify-center items-center">
                        {data.temperature}
                      </div>
                      <div className="w-[10%] font-semibold text-kBlue-400 flex justify-center items-center">
                        {data.humidity}
                      </div>
                      <div className="w-[10%] font-semibold text-kBlue-400 flex justify-center items-center">
                        {data.batteryCapacity}
                      </div>
                      <div className="w-[20%] text-kBlue-400 font-bold flex justify-center items-center">
                        {"Delivering " + data.currentTransaction}
                      </div>
                    </div>
                    {showDetailTransaction == data.unitId && (
                      <div className="w-full bg-kBlue-100 bg-opacity-30">
                        <div className="flex h-auto w-auto border-collapse py-3 text-center text-[12px] text-kBlue-400 font-bold">
                          <div className="w-[5%]"></div>
                          <div className="w-[15%]">Transaction Code</div>
                          <div className="w-[25%]">Address</div>
                          <div className="w-[15%]">Distance</div>
                          <div className="w-[15%]">Time Estimation</div>
                          <div className="w-[15%]">Status</div>
                          <div className="w-[15%]">Detail</div>
                        </div>
                        {data.transactionUnits.map((transaction) => {
                          var isDone =
                            data.transactionUnits.findIndex(
                              (item) =>
                                item.orderNum === data.currentTransaction
                            ) >
                            data.transactionUnits.findIndex(
                              (item) => item.orderNum === transaction.orderNum
                            );
                          return (
                            <div
                              key={transaction.orderNum}
                              className={`flex h-auto w-auto border-collapse py-3 text-center text-[12px] ${
                                transaction.orderNum == data.currentTransaction
                                  ? "text-kBlue-400 font-bold"
                                  : "text-kGrey"
                              }`}
                            >
                              <div className="w-[5%]"></div>
                              <div className="w-[15%]">
                                {transaction.orderNum}
                              </div>
                              <div className="w-[25%]">
                                {transaction.address.alamat}
                              </div>
                              <div className="w-[15%]">
                                {transaction.distance}
                              </div>
                              <div className="w-[15%]">
                                {transaction.duration}
                              </div>
                              <div
                                className={`w-[15%] ${
                                  isDone
                                    ? "text-kGrey"
                                    : data.temperature >
                                      transaction.deliveryCat.maxSuhu
                                    ? "text-kRed"
                                    : data.temperature <
                                      transaction.deliveryCat.minSuhu
                                    ? "text-kRed"
                                    : "text-kGreen-200"
                                }`}
                              >
                                {isDone
                                  ? "Delivered"
                                  : data.temperature >
                                    transaction.deliveryCat.maxSuhu
                                  ? "Over Temperature"
                                  : data.temperature <
                                    transaction.deliveryCat.minSuhu
                                  ? "Under Temperature"
                                  : "Safe"}
                              </div>
                              <div className="w-[15%] flex justify-center items-center">
                                <button
                                  onClick={() => {
                                    var dataDetail = {
                                      orderNum: transaction.orderNum,
                                      products: transaction.productDetails,
                                    };

                                    setDetailProduct(dataDetail);
                                    setShowDetailProduct(true);
                                  }}
                                  className="text-[12px] border-2 border-kBlue-200 text-kBlue-200 font-medium rounded-lg px-5 py-1 hover:text-white hover:bg-kBlue-200 active:bg-kBlue-300"
                                >
                                  See Detail
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MediGuard;
