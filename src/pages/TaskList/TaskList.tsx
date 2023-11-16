import { useState } from "react";
import Button from "../../components/Button/Button";
import PopUp from "../../components/PopUp/PopUp";
import Table from "../../components/Table/Table";
import Dropdown from "../../components/Dropdown/Dropdown";
import Textfield from "../../components/Textfield/Textfield";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";

function TaskList() {
  const dataDummy = [
    {
      id: 1,
      Name: "PCK000000-01",
      ProductCode: "PCT 992 02",
      PackingDate: "16 August",
      Amount: 40,
      Status: "Assigned",
      AssignedTo: "B 1992 MD",
    },
    {
      id: 2,
      Name: "PCK000000-01",
      ProductCode: "PCT 992 02",
      PackingDate: "16 August",
      Amount: 40,
      Status: "Not Assigned",
      AssignedTo: "B 1992 MD",
    },
    {
      id: 3,
      Name: "PCK000000-01",
      ProductCode: "PCT 992 02",
      PackingDate: "16 August",
      Amount: 40,
      Status: "Not Assigned",
      AssignedTo: "B 1992 MD",
    },
    {
      id: 3,
      Name: "PCK000000-01",
      ProductCode: "PCT 992 02",
      PackingDate: "16 August",
      Amount: 40,
      Status: "On Check",
      AssignedTo: "B 1992 MD",
    },
    {
      id: 3,
      Name: "PCK000000-01",
      ProductCode: "PCT 992 02",
      PackingDate: "16 August",
      Amount: 40,
      Status: "Assigned",
      AssignedTo: "B 1992 MD",
    },
    {
      id: 3,
      Name: "PCK000000-01",
      ProductCode: "PCT 992 02",
      PackingDate: "16 August",
      Amount: 40,
      Status: "On Check",
      AssignedTo: "B 1992 MD",
    },
    {
      id: 3,
      Name: "PCK000000-01",
      ProductCode: "PCT 992 02",
      PackingDate: "16 August",
      Amount: 40,
      Status: "Assigned",
      AssignedTo: "B 1992 MD",
    },
  ];

  const [showPopUpAssign, setShowPopUpAssign] = useState(false);
  const [showPopUpAdd, setShowPopUpAdd] = useState(false);
  const [transactionId, setTransactionId] = useState(0);

  return (
    <>
      <PopUp
        visible={showPopUpAssign}
        onClose={() => setShowPopUpAssign(false)}
      >
        <h1 className="text-[32px] font-semibold text-kBlue-400">
          Assign Transport
        </h1>
        <div className="flex gap-4 my-6 w-full items-center">
          <Dropdown label={"Origin"} options={[]} />
          <div className="h-[2px] w-10 bg-disable"></div>
          <Dropdown label={"Destination"} options={[]} />
        </div>
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
            <div className="w-[15%] flex justify-center items-center">L</div>
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
              <Dropdown isLabel label={"Product code"} options={[]} />
            </div>
            <div className="w-1/2"></div>
          </div>
          <div className="flex gap-10 my-6 w-full items-center">
            <div className="w-1/2">
              <Textfield label={"Amount"} />
            </div>
            <div className="w-1/2">
              <DateTimePicker
                required
                label={"Select packing date"}
                selectedDateTime={null}
                onDateTimeChange={function (date: Date | null): void {
                  throw new Error("Function not implemented.");
                }}
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
            <div className="mb-6 flex justify-end">
              <Button
                text={"Add Task"}
                type={"button"}
                onClick={() => setShowPopUpAdd(true)}
              />
            </div>
            <Table
              data={dataDummy}
              column={[
                "Name",
                "Product Code",
                "Packing Date",
                "Amount",
                "Status",
                "Assigned to",
              ]}
              isLoading={false}
              type={"task"}
              onEdit={(x: number) => {
                setTransactionId(x);
                setShowPopUpAdd(true);
              }}
              onAssign={(x: number) => {
                setTransactionId(x);
                setShowPopUpAssign(true);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskList;
