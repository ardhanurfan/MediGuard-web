import Table from "../../components/Table/Table";

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

  return (
    <div className="min-h-screen w-full bg-kBlue-100 xl:pl-[240px] pt-16 pl-0">
      <div className="w-full xl:p-6 p-3">
        <div className="w-full bg-white rounded-xl p-6">
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
          />
        </div>
      </div>
    </div>
  );
}

export default TaskList;
