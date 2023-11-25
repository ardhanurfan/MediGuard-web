import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import PopUp from "../../components/PopUp/PopUp";
import Table from "../../components/Table/Table";
import Dropdown from "../../components/Dropdown/Dropdown";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";
import Cookies from "js-cookie";
import { toastError, toastSuccess } from "../../components/Toast/Toast";
import { getWithAuth, post } from "../../api/api";
import moment from "moment";
import Paginate from "../../components/Paginate/Paginate";
import useSocket from "../../api/socket";

interface ProductDetails {
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
  kategoriPengiriman: string;
}

interface Address {
  _id: string;
  kodeCabang: string;
  custNum: number;
  alamat: string;
  state: string;
  city: string;
  province: string;
  zipCode: number;
  channel: string;
  shipMethodCode: string;
  shipMethodDesc: string;
  deliveryAreaGroup: string;
  latitude: number;
  longitude: number;
}

interface Branches {
  _id: string;
  kode_cabang: string;
  namaCabang: string;
  alamat: string;
  latitude: number;
  longitude: number;
}

interface Transaction {
  _id: string;
  staffId: string;
  orderNum: number;
  deliveryNum: number;
  transportType: string;
  branchCode: string;
  ship_method_code: string;
  cust_num: number;
  prod_code: string[];
  shipped_qty: number;
  unitId: string;
  packing_date: string;
  delivery_date: string;
  arrival_date: string;
  productDetails: ProductDetails;
  address: Address;
  branches: Branches;
}

interface TransactionTable {
  id: string;
  transactionCode: string;
  transportType: string;
  branch: string;
  packingDate: string;
  deliveryDate: string;
  arrivedDate: string;
  status: string;
  assignedTo: string;
}

interface CourierInternal {
  _id: string;
  shipper: string;
  shipmethod_code: string;
  vendorId: number;
  service: string;
  chargeBase: string;
  licensePlate: string;
  minType: string;
  calcType: string;
  type: string;
  moda: string;
  printFlag: string;
  packerFlag: string;
  leadTime: number;
  ppnType: string;
  wht: string;
  lineNumber: number;
  termMin: number;
  termMax: number;
  rate: number;
}

interface CourierExternal {
  courier: string;
  service: string;
  description: string;
  cost: CostData[];
}

interface CostData {
  value: number;
  etd: string;
  note: string;
}

function Transaction() {
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to server");
      });

      // Mendengarkan event 'message' dari server
      socket.on("transaction", (data) => {
        var dataTran = data as Transaction[];
        setTransactionsAll(dataTran);
        const mappedTransactions: TransactionTable[] = dataTran.map(
          (transaction) => ({
            id: transaction._id,
            transactionCode: `${transaction.orderNum}`,
            transportType: transaction.transportType,
            branch: transaction.branchCode,
            packingDate: transaction.packing_date
              ? moment(transaction.packing_date).format("DD MMM YYYY, HH:mm:ss")
              : "",
            deliveryDate: transaction.delivery_date
              ? moment(transaction.delivery_date).format(
                  "DD MMM YYYY, HH:mm:ss"
                )
              : "",
            arrivedDate: transaction.arrival_date
              ? moment(transaction.arrival_date).format("DD MMM YYYY, HH:mm:ss")
              : "",
            status: transaction.unitId ? "Assigned" : "Not Assigned",
            assignedTo: transaction.unitId || "Unassigned",
          })
        );
        setTransactions(mappedTransactions);
      });
      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    }

    // Membersihkan listener saat komponen di-unmount
    return () => {
      if (socket) {
        socket.off("transaction");
      }
    };
  }, [socket]);

  const [showPopUpAssign, setShowPopUpAssign] = useState(false);

  // FIELDS
  const [transaction, setTransaction] = useState<Transaction>();
  const [packingDate, setPackingDate] = useState<Date | null>(null);
  const [mediguardSelected, setMediguardSelected] = useState<string>();
  const [courierSelected, setCourierSelected] = useState<string>("");

  // Data
  const [mediguardOption, setMediguardOption] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [transactions, setTransactions] = useState<TransactionTable[]>([]);
  const [transactionsAll, setTransactionsAll] = useState<Transaction[]>([]);

  const token = Cookies.get("token_mediguard");
  const getTransactions = async () => {
    if (token) {
      try {
        const response = await getWithAuth(token, "transaction/get");
        const data = response.data?.data as Transaction[];
        setTransactionsAll(data);
        const mappedTransactions: TransactionTable[] = data.map(
          (transaction) => ({
            id: transaction._id,
            transactionCode: `${transaction.orderNum}`,
            transportType: transaction.transportType,
            branch: transaction.branchCode,
            packingDate: transaction.packing_date
              ? moment(transaction.packing_date).format("DD MMM YYYY, HH:mm:ss")
              : "",
            deliveryDate: transaction.delivery_date
              ? moment(transaction.delivery_date).format(
                  "DD MMM YYYY, HH:mm:ss"
                )
              : "",
            arrivedDate: transaction.arrival_date
              ? moment(transaction.arrival_date).format("DD MMM YYYY, HH:mm:ss")
              : "",
            status: transaction.unitId ? "Assigned" : "Not Assigned",
            assignedTo: transaction.unitId || "Unassigned",
          })
        );
        setTransactions(mappedTransactions);
      } catch (error) {
        toastError("Get Transactions Failed");
      }
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  /* Vendor Assign */
  const getMediguard = async () => {
    if (token) {
      try {
        const response = await getWithAuth(token, "unit/get");
        var data = response.data?.data as {
          unitId: string;
          currentState: boolean;
        }[];
        data = data.filter((item) => !item.currentState);
        setMediguardOption(
          data.map((val: { unitId: string }) => {
            return { value: val.unitId, label: val.unitId };
          })
        );
      } catch (error) {
        toastError("Get MediGuards Failed");
      }
    }
  };

  const [externalCouriers, setExternalCouriers] = useState<CourierExternal[]>(
    []
  );
  const [internalCouriers, setInternalCouriers] = useState<CourierInternal[]>(
    []
  );
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [isLoadingVendor, setIsLoadingVendor] = useState<boolean>(false);
  const getVendor = async (transaksi: Transaction) => {
    setIsLoadingVendor(true);
    try {
      getMediguard();
      const response = await post("vendor/recommendation", {
        branch_address: transaksi.branches.alamat,
        relation_address: transaksi.address.city,
        weight: Math.ceil(
          transaksi.shipped_qty * transaksi.productDetails.beratGram
        ),
        branch_code: transaksi.branchCode,
        distance: "100",
        branch_lat: transaksi.branches.latitude,
        branch_lng: transaksi.branches.longitude,
        add_lat: transaksi.address.latitude,
        add_lng: transaksi.address.longitude,
      });
      var data = response.data.data;
      setExternalCouriers(data.external.splice(0, 5));
      var internal = data.internal.filter(
        (item: CourierInternal) => item._id != data.rekomendasi[0]._id
      ) as CourierInternal[];
      internal.unshift(data.rekomendasi[0] as CourierInternal);
      setInternalCouriers(internal.splice(0, 3));

      const maps = await post("vendor/distance-duration", {
        branch_lat: transaksi.branches.latitude,
        branch_lng: transaksi.branches.longitude,
        add_lat: transaksi.address.latitude,
        add_lng: transaksi.address.longitude,
      });
      var mapsData = maps.data.data;
      setDistance(mapsData.distance);
      setDuration(mapsData.duration);
    } catch (error) {
      toastError("Get vendor failed");
    } finally {
      setIsLoadingVendor(false);
    }
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const assign = async () => {
    setIsLoading(true);
    try {
      if (
        transaction &&
        mediguardSelected &&
        packingDate &&
        duration != "" &&
        distance != "" &&
        courierSelected != ""
      ) {
        await post("transaction/assign", {
          id: transaction?._id,
          unitId: mediguardSelected,
          vendor: courierSelected.split(" ")[0],
          packingDate: moment(packingDate).format("MM/DD/YYYY HH:mm:ss"),
          duration: duration,
          distance: distance,
          orderNum: transaction.orderNum,
        });
        toastSuccess("Assign Successfully");
        setShowPopUpAssign(false);
      } else {
        toastError("All field is required");
      }
    } catch (error) {
      console.log(error);
      toastError("Assign Failed");
    } finally {
      setIsLoading(false);
    }
  };

  /* Pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * 10;
  const indexOfFirstItem = indexOfLastItem - 10;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <PopUp
        visible={showPopUpAssign}
        onClose={() => {
          setShowPopUpAssign(false);
          setInternalCouriers([]);
          setExternalCouriers([]);
        }}
      >
        {isLoadingVendor ? (
          <div className={`flex items-center justify-center`}>
            <svg
              className="mr-3 h-10 w-10 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          <>
            <h1 className="text-[32px] font-semibold text-kBlue-400">
              Assign Transport
            </h1>
            <div className="flex gap-10 my-6 w-full items-center">
              <div className="w-1/2">
                <Dropdown
                  isLabel
                  label={"Mediguard"}
                  options={mediguardOption}
                  onChange={(val) => setMediguardSelected(val?.value)}
                />
              </div>
              <div className="w-1/2">
                <DateTimePicker
                  showTimeSelect
                  label={"Packing Date"}
                  selectedDateTime={packingDate}
                  onDateTimeChange={(date: Date | null) => setPackingDate(date)}
                />
              </div>
              <div className="w-1/2"></div>
            </div>
            <div className="flex justify-between">
              <div>
                <h1 className="text-[20px] font-semibold text-kBlue-400">
                  Trips
                </h1>
                <h1 className="text-[14px] font-semibold text-kBlue-300 my-2">
                  Origin
                  <p className="font-normal text-kGrey">
                    {transaction?.branches.alamat}
                  </p>
                </h1>
                <h1 className="text-[14px] font-semibold text-kBlue-300 my-2">
                  Destination
                  <p className="font-normal text-kGrey">
                    {transaction?.address.alamat}
                  </p>
                </h1>
              </div>
              <div>
                <h1 className="text-[20px] font-semibold text-kBlue-400">
                  Estimation on Driver transportation
                </h1>
                <h1 className="text-[14px] font-semibold text-kBlue-300 my-2">
                  Distance {` ${distance}`}
                </h1>
                <h1 className="text-[14px] font-semibold text-kBlue-300 my-2">
                  Duration {` ${duration}`}
                </h1>
              </div>
            </div>
            <h1 className="text-[24px] font-semibold text-kBlue-400 mt-8">
              Choose Transport
            </h1>
            <h1 className="text-[16px] font-semibold text-kBlue-300 mt-2">
              External
            </h1>
            <div className="w-full">
              <div className="flex h-10 bg-kHeadTable">
                <div className="w-[10%]"></div>
                <div className="w-[10%] flex justify-center items-center">
                  Rank
                </div>
                <div className="w-[25%] flex justify-center items-center">
                  Name
                </div>
                <div className="w-[20%] flex justify-center items-center">
                  Price
                </div>
                <div className="w-[20%] flex justify-center items-center">
                  Delivering Time
                </div>
                <div className="w-[15%] flex justify-center items-center">
                  Service
                </div>
              </div>
              {externalCouriers.map((val, index) => (
                <div
                  onClick={() =>
                    setCourierSelected(`${val.courier} ${val.service}`)
                  }
                  className="flex h-20 my-4 text-kBlue-400 text-[20px] font-semibold cursor-pointer"
                >
                  <div className="w-[10%] flex justify-center items-center">
                    <div
                      className={`w-4 h-4 rounded-full outline outline-2 outline-offset-2 ${
                        courierSelected == `${val.courier} ${val.service}`
                          ? "outline-kBlue-200 bg-kBlue-200"
                          : "outline-disable bg-disable"
                      }`}
                    />
                  </div>
                  <div className="w-[10%] flex justify-center items-center">
                    {index + 1}
                  </div>
                  <div className="w-[25%] flex justify-center items-center">
                    {val.courier == "tiki" ? (
                      <img src="./assets/tiki.png" alt="" className="h-8" />
                    ) : val.courier == "jne" ? (
                      <img src="./assets/jne.png" alt="" className="h-8" />
                    ) : (
                      <img src="./assets/pos.png" alt="" className="h-12" />
                    )}
                  </div>
                  <div className="w-[20%] flex justify-center items-center">
                    Rp {`${val.cost[0].value}`}
                  </div>
                  <div className="w-[20%] flex justify-center items-center">
                    {val.cost[0].etd.split("HARI")[0] + " Hari"}
                  </div>
                  <div className="w-[15%] flex justify-center items-center">
                    {val.service}
                  </div>
                </div>
              ))}
            </div>
            <h1 className="text-[16px] font-semibold text-kBlue-300 mt-2">
              Internal
            </h1>
            <div className="w-full">
              <div className="flex h-10 bg-kHeadTable">
                <div className="w-[10%]"></div>
                <div className="w-[10%] flex justify-center items-center">
                  Rank
                </div>
                <div className="w-[25%] flex justify-center items-center">
                  Shipper
                </div>
                <div className="w-[20%] flex justify-center items-center">
                  Price
                </div>
                <div className="w-[20%] flex justify-center items-center">
                  Moda
                </div>
                <div className="w-[15%] flex justify-center items-center">
                  Charge Base
                </div>
              </div>
              {internalCouriers.map((val, index) => (
                <div
                  onClick={() => setCourierSelected(val.vendorId.toString())}
                  className="flex h-20 my-4 text-kBlue-400 text-[20px] font-semibold cursor-pointer"
                >
                  <div className="w-[10%] flex justify-center items-center">
                    <div
                      className={`w-4 h-4 rounded-full outline outline-2 outline-offset-2 ${
                        courierSelected == val.vendorId.toString()
                          ? "outline-kBlue-200 bg-kBlue-200"
                          : "outline-disable bg-disable"
                      }`}
                    />
                  </div>
                  <div className="w-[10%] flex justify-center items-center">
                    {index + 1}
                  </div>
                  <div className="w-[25%] flex justify-center items-center text-kBlue-300">
                    {val.shipper}
                  </div>
                  <div className="w-[20%] flex justify-center items-center">
                    Rp {`${val.rate}`}
                  </div>
                  <div className="w-[20%] flex justify-center items-center">
                    {val.moda}
                  </div>
                  <div className="w-[15%] flex justify-center items-center">
                    {val.chargeBase}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="mt-6 flex justify-end">
          <Button
            text={"Save"}
            type={"button"}
            onClick={async () => {
              await assign();
            }}
            isLoading={isLoading}
          />
        </div>
      </PopUp>

      <div className="min-h-screen w-full bg-kBlue-100 xl:pl-[240px] pt-16 pl-0">
        <div className="w-full xl:p-6 p-3">
          <div className="w-full bg-white rounded-xl p-6">
            {/* <div className="mb-6 flex justify-end">
              <Button
                text={"Add Task"}
                type={"button"}
                onClick={() => setShowPopUpAdd(true)}
              />
            </div> */}
            <Table
              data={currentItems}
              column={[
                "Transaction Code",
                "Transport Type",
                "Branch",
                "Packing Date",
                "Delivery Date",
                "Arrival Date",
                "Status",
                "Assigned to",
              ]}
              isLoading={false}
              type={"transaction"}
              // onEdit={(x: number) => {
              //   setTransactionId(x);
              //   setShowPopUpAdd(true);
              // }}
              onAssign={(id: string) => {
                var currData = transactionsAll.find((val) => val._id == id);
                if (currData) {
                  getVendor(currData);
                  setShowPopUpAssign(true);
                  setTransaction(currData);
                }
              }}
              isEdit={false}
            />
            <Paginate
              totalPages={Math.ceil(transactions.length / 10)}
              totalData={transactions.length}
              dataLimit={10}
              current={(curr: number) => setCurrentPage(curr)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Transaction;
