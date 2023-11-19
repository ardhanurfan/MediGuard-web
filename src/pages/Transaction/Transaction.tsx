import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import PopUp from "../../components/PopUp/PopUp";
import Table from "../../components/Table/Table";
import Dropdown from "../../components/Dropdown/Dropdown";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";
import Cookies from "js-cookie";
import { toastError } from "../../components/Toast/Toast";
import { getWithAuth } from "../../api/api";
import moment from "moment";
import Paginate from "../../components/Paginate/Paginate";

interface Transaction {
  _id: string;
  orderNum: number;
  deliveryNum: number;
  transportType: string;
  branchCode: string;
  ship_method_code: string;
  cust_num: number;
  shipped_qty: number;
  packing_date: Date | null;
  unitId: string | null;
  delivery_date: Date | null;
  arrival_date: Date | null;
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

function Transaction() {
  const [showPopUpAssign, setShowPopUpAssign] = useState(false);
  const [showPopUpAdd, setShowPopUpAdd] = useState(false);
  // const [transactionId, setTransactionId] = useState(0);

  const [packingDate, setPackingDate] = useState<Date | null>(null);

  const [transactions, setTransactions] = useState<TransactionTable[]>([]);

  const token = Cookies.get("token_mediguard");
  const getTransactions = async () => {
    if (token) {
      try {
        const response = await getWithAuth(token, "transaction/get");
        const data = response.data?.data as Transaction[];
        const mappedTransactions: TransactionTable[] = data.map(
          (transaction) => ({
            id: transaction._id,
            transactionCode: `${transaction.orderNum}`,
            transportType: transaction.transportType,
            branch: transaction.branchCode,
            packingDate:
              moment(transaction.packing_date).format(
                "DD MMM YYYY, HH:MM:SS"
              ) || "N/A",
            deliveryDate:
              moment(transaction.delivery_date).format(
                "DD MMM YYYY, HH:MM:SS"
              ) || "N/A",
            arrivedDate:
              moment(transaction.arrival_date).format(
                "DD MMM YYYY, HH:MM:SS"
              ) || "N/A",
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

  /* Pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * 10;
  const indexOfFirstItem = indexOfLastItem - 10;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <PopUp
        visible={showPopUpAssign}
        onClose={() => setShowPopUpAssign(false)}
      >
        <h1 className="text-[32px] font-semibold text-kBlue-400">
          Assign Transport
        </h1>
        <div className="flex gap-10 my-6 w-full items-center">
          <div className="w-1/2">
            <Dropdown isLabel label={"Branch"} options={[]} />
          </div>
          <div className="w-1/2">
            <Dropdown isLabel label={"Address Destination"} options={[]} />
          </div>
        </div>
        <div className="flex gap-10 my-6 w-full items-center">
          <div className="w-1/2">
            <Dropdown isLabel label={"Mediguard"} options={[]} />
          </div>
          <div className="w-1/2"></div>
        </div>
        <h1 className="text-[24px] font-semibold text-kBlue-400">
          Choose Transport
        </h1>
        <div className="w-full">
          <div className="flex h-10 bg-kHeadTable">
            <div className="w-[10%]"></div>
            <div className="w-[10%] flex justify-center items-center">Rank</div>
            <div className="w-[25%] flex justify-center items-center">Name</div>
            <div className="w-[20%] flex justify-center items-center">
              Price
            </div>
            <div className="w-[20%] flex justify-center items-center">
              Delivering Time
            </div>
            <div className="w-[15%] flex justify-center items-center">
              Mediguard Size
            </div>
          </div>
          <div className="flex h-20 my-4 text-kBlue-400 text-[20px] font-semibold">
            <div className="w-[10%] flex justify-center items-center">
              <div className="w-4 h-4 rounded-full bg-disable outline outline-2 outline-offset-2 outline-disable cursor-pointer" />
            </div>
            <div className="w-[10%] flex justify-center items-center">1</div>
            <div className="w-[25%] flex justify-center items-center">
              <img src="./assets/logo.svg" alt="" className="h-16" />
            </div>
            <div className="w-[20%] flex justify-center items-center">
              Rp122.000
            </div>
            <div className="w-[20%] flex justify-center items-center">
              5 Jam
            </div>
            <div className="w-[15%] flex justify-center items-center">
              Normal
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            text={"Save"}
            type={"button"}
            onClick={() => setShowPopUpAssign(false)}
          />
        </div>
      </PopUp>

      <PopUp visible={showPopUpAdd} onClose={() => setShowPopUpAdd(false)}>
        <form onSubmit={undefined}>
          <h1 className="text-[32px] font-semibold text-kBlue-400">
            New Task List
          </h1>
          <div className="flex gap-10 my-6 w-full items-center">
            <div className="w-1/2">
              <Dropdown isLabel label={"Transaction code"} options={[]} />
            </div>
            <div className="w-1/2"></div>
          </div>
          <div className="flex gap-10 my-6 w-full items-center">
            <div className="w-1/2">
              <Dropdown isLabel label={"Transport type"} options={[]} />
            </div>
            <div className="w-1/2">
              <DateTimePicker
                required
                showTimeSelect
                label={"Select packing date"}
                selectedDateTime={packingDate}
                onDateTimeChange={(date: Date | null) => setPackingDate(date)}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button
              text={"Save"}
              type={"submit"}
              onClick={() => setShowPopUpAdd(false)}
            />
          </div>
        </form>
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
              onAssign={() => {
                // setTransactionId(x);
                setShowPopUpAssign(true);
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
