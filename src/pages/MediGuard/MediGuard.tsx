import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const dataDummy = [
  {
    id: 1,
    mediGuardCode: "MD000000-01",
    plateNumber: "AB 3449 TT",
    departureTime: "16 August 2023, 12.35",
    temperature: "40 ºC",
    humidity: "35 %",
    progress: "Delivering PCK0000000-01",
    transaction: [
      {
        transactionCode: "PCK000000-01",
        address: "Jln. Lorem Ipsum No. Dolor, Sit, Amet 000000",
        distance: "24km",
        timeEstimation: "01:00",
        status: "Safe",
        onGoing: false,
        product: [
          {
            productName: "Paracetamol 200mg",
            type: "Tablet",
            amount: "200",
          },
        ],
      },
      {
        transactionCode: "PCK000000-01",
        address: "Jln. Lorem Ipsum No. Dolor, Sit, Amet 000000",
        distance: "24km",
        timeEstimation: "01:00",
        status: "Safe",
        onGoing: true,
        product: [
          {
            productName: "Paracetamol 200mg",
            type: "Tablet",
            amount: "200",
          },
        ],
      },
      {
        transactionCode: "PCK000000-01",
        address: "Jln. Lorem Ipsum No. Dolor, Sit, Amet 000000",
        distance: "24km",
        timeEstimation: "01:00",
        status: "Safe",
        onGoing: false,
        product: [
          {
            productName: "Paracetamol 200mg",
            type: "Tablet",
            amount: "200",
          },
        ],
      },
    ],
  },
  {
    id: 1,
    mediGuardCode: "MD000000-02",
    plateNumber: "AB 3449 TT",
    departureTime: "16 August 2023, 12.35",
    temperature: "40 ºC",
    humidity: "35 %",
    progress: "Delivering PCK0000000-01",
    transaction: [
      {
        transactionCode: "PCK000000-01",
        address: "Jln. Lorem Ipsum No. Dolor, Sit, Amet 000000",
        distance: "24km",
        timeEstimation: "01:00",
        status: "Safe",
        onGoing: false,
        product: [
          {
            productName: "Paracetamol 200mg",
            type: "Tablet",
            amount: "200",
          },
        ],
      },
      {
        transactionCode: "PCK000000-01",
        address: "Jln. Lorem Ipsum No. Dolor, Sit, Amet 000000",
        distance: "24km",
        timeEstimation: "01:00",
        status: "Safe",
        onGoing: true,
        product: [
          {
            productName: "Paracetamol 200mg",
            type: "Tablet",
            amount: "200",
          },
        ],
      },
      {
        transactionCode: "PCK000000-01",
        address: "Jln. Lorem Ipsum No. Dolor, Sit, Amet 000000",
        distance: "24km",
        timeEstimation: "01:00",
        status: "Safe",
        onGoing: false,
        product: [
          {
            productName: "Paracetamol 200mg",
            type: "Tablet",
            amount: "200",
          },
        ],
      },
    ],
  },
];

function MediGuard() {
  const [detailProduct, setDetailProduct] = useState<
    {
      productName: string;
      type: string;
      amount: string;
    }[]
  >([]);

  const [showDetailTransaction, setShowDetailTransaction] = useState<
    string | null
  >(null);

  return (
    <>
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
                <div className="w-[15%]">Plate Number</div>
                <div className="w-[20%]">Departure Time</div>
                <div className="w-[10%]">Temperature</div>
                <div className="w-[10%]">Humidity</div>
                <div className="w-[25%]">Progress</div>
              </div>
              {dataDummy.map((data) => {
                return (
                  <div key={data.id}>
                    <div className="flex h-auto w-auto border-collapse py-3 text-center text-[12px] text-kGrey">
                      <div
                        onClick={() => {
                          if (data.mediGuardCode == showDetailTransaction) {
                            setShowDetailTransaction(null);
                          } else {
                            setShowDetailTransaction(data.mediGuardCode);
                          }
                        }}
                        className="w-[5%] text-[24px] text-kBlue-400 flex justify-center items-center cursor-pointer hover:text-kBlue-200 active:text-kBlue-300"
                      >
                        {data.mediGuardCode == showDetailTransaction ? (
                          <IoIosArrowUp />
                        ) : (
                          <IoIosArrowDown />
                        )}
                      </div>
                      <div className="w-[15%] text-kBlue-400 font-bold">
                        {data.mediGuardCode}
                      </div>
                      <div className="w-[15%]">{data.plateNumber}</div>
                      <div className="w-[20%]">{data.departureTime}</div>
                      <div className="w-[10%] font-semibold text-kBlue-400">
                        {data.temperature}
                      </div>
                      <div className="w-[10%] font-semibold text-kBlue-400">
                        {data.humidity}
                      </div>
                      <div className="w-[25%] text-kBlue-400 font-bold">
                        {data.progress}
                      </div>
                    </div>
                    {showDetailTransaction == data.mediGuardCode && (
                      <div className="w-full bg-kBlue-100 bg-opacity-50">
                        <div className="flex h-auto w-auto border-collapse py-3 text-center text-[12px] text-kBlue-400 font-bold">
                          <div className="w-[5%]"></div>
                          <div className="w-[15%]">Transaction Code</div>
                          <div className="w-[25%]">Address</div>
                          <div className="w-[15%]">Distance</div>
                          <div className="w-[15%]">Time Estimation</div>
                          <div className="w-[15%]">Status</div>
                          <div className="w-[15%]">Detail</div>
                        </div>
                        {data.transaction.map((transactionData) => {
                          return (
                            <div
                              key={transactionData.transactionCode}
                              className={`flex h-auto w-auto border-collapse py-3 text-center text-[12px] ${
                                transactionData.onGoing
                                  ? "text-kBlue-400 font-medium"
                                  : "text-kGrey"
                              }`}
                            >
                              <div className="w-[5%]"></div>
                              <div className="w-[15%]">
                                {transactionData.transactionCode}
                              </div>
                              <div className="w-[25%]">
                                {transactionData.address}
                              </div>
                              <div className="w-[15%]">
                                {transactionData.distance}
                              </div>
                              <div className="w-[15%]">
                                {transactionData.timeEstimation}
                              </div>
                              <div className="w-[15%]">
                                {transactionData.status}
                              </div>
                              <div className="w-[15%] flex justify-center items-center">
                                <button
                                  onClick={() =>
                                    setDetailProduct(transactionData.product)
                                  }
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
