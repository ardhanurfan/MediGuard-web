import Table from "../../components/Table/Table";

function Conveyance() {
  const dataDummy = [
    {
      id: 1,
      Name: "B 0001 MG",
      ProductCode: "MD000000-01",
      DepartureTime: "16 August 2023, 12.35",
      Temperature: "40 ºC",
      Kelembaban: "35 %",
      Status: "Safe",
    },
    {
      id: 1,
      Name: "B 0001 MG",
      ProductCode: "MD000000-01",
      DepartureTime: "16 August 2023, 12.35",
      Temperature: "40 ºC",
      Kelembaban: "35 %",
      Status: "Over Heat",
    },
    {
      id: 1,
      Name: "B 0001 MG",
      ProductCode: "MD000000-01",
      DepartureTime: "16 August 2023, 12.35",
      Temperature: "40 ºC",
      Kelembaban: "35 %",
      Status: "Over Temperature",
    },
    {
      id: 1,
      Name: "B 0001 MG",
      ProductCode: "MD000000-01",
      DepartureTime: "16 August 2023, 12.35",
      Temperature: "40 ºC",
      Kelembaban: "35 %",
      Status: "Safe",
    },
    {
      id: 1,
      Name: "B 0001 MG",
      ProductCode: "MD000000-01",
      DepartureTime: "16 August 2023, 12.35",
      Temperature: "40 ºC",
      Kelembaban: "35 %",
      Status: "Over Temperature",
    },
    {
      id: 1,
      Name: "B 0001 MG",
      ProductCode: "MD000000-01",
      DepartureTime: "16 August 2023, 12.35",
      Temperature: "40 ºC",
      Kelembaban: "35 %",
      Status: "Safe",
    },
    {
      id: 1,
      Name: "B 0001 MG",
      ProductCode: "MD000000-01",
      DepartureTime: "16 August 2023, 12.35",
      Temperature: "40 ºC",
      Kelembaban: "35 %",
      Status: "Safe",
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
              "Departure Time",
              "Temperature",
              "Kelembaban",
              "Status",
            ]}
            isLoading={false}
            type={"conveyance"}
          />
        </div>
      </div>
    </div>
  );
}

export default Conveyance;
