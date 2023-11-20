import { LiaEdit } from "react-icons/lia";

function Table({
  data,
  column,
  isLoading,
  onEdit,
  onAssign,
  isEdit = true,
  type,
}: {
  data: any;
  column: any;
  isLoading: boolean;
  onEdit?: (x: number) => void | undefined;
  onAssign?: (x: string) => void | undefined;
  isEdit?: boolean;
  type: "active" | "transaction" | "mediguard";
}) {
  const Load = () => {
    const dummy = [1, 2, 3, 4, 5];
    return dummy.map((idx: number) => (
      <tr key={idx}>
        <td
          className={`${
            !isEdit && "hidden"
          } text-kBlue-400 h-auto w-auto border-collapse border-b-2 border-kHeadTable px-2 py-3 xl:px-4 text-2xl`}
        >
          <LiaEdit />
        </td>
        {column.map((idx: number) => {
          return (
            <td
              key={idx}
              className="h-auto w-auto border-collapse border-b-2 border-kHeadTable px-2 py-3 text-center xl:px-4"
            >
              <div className="h-4 w-full animate-pulse bg-kGrey-100"></div>
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead className="rounded-full">
            <tr>
              <th
                className={`${
                  !isEdit && "hidden"
                } h-auto w-auto border-collapse bg-kHeadTable px-2 py-1 text-center font-normal xl:px-4`}
              >
                <p> </p>
              </th>
              {column.map((row: any, idx: number) => {
                return (
                  <th
                    key={idx}
                    className="h-auto w-auto border-collapse bg-kHeadTable px-2 py-1 text-center font-medium xl:px-4 text-[12px] text-kGrey"
                  >
                    {row}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <Load />
            ) : (
              Object.values(data).map((obj: any, idx: number) => {
                return (
                  <tr key={idx}>
                    <td
                      onClick={() => onEdit!(obj.id)}
                      className={`${
                        !isEdit && "hidden"
                      } text-kBlue-400 h-auto w-auto border-collapse border-b-2 border-kHeadTable px-2 py-3 xl:px-4 text-2xl hover:text-kBlue-200 cursor-pointer`}
                    >
                      <LiaEdit />
                    </td>
                    {Object.values(obj).map((row: any, idx: number) => {
                      if (idx == 0) {
                        return;
                      }
                      if (
                        Object.keys(obj)[idx].toLocaleLowerCase() === "name" ||
                        Object.keys(obj)[idx].toLocaleLowerCase() === "amount"
                      ) {
                        return (
                          <td
                            key={idx}
                            className="h-auto w-auto border-collapse border-b-2 border-kHeadTable px-2 py-3 text-center xl:px-4 text-kBlue-400 text-[12px] font-semibold"
                          >
                            {row}
                          </td>
                        );
                      }
                      if (
                        Object.keys(obj)[idx].toLocaleLowerCase() === "status"
                      ) {
                        return (
                          <td
                            key={idx}
                            className={`h-auto w-auto border-collapse border-b-2 border-kHeadTable px-2 py-3 text-center xl:px-4 ${
                              type == "active"
                                ? row == "On Going"
                                  ? "text-kGreen-200"
                                  : row == "Paused"
                                  ? "text-kYellow"
                                  : "text-kRed"
                                : type == "transaction"
                                ? row == "Assigned"
                                  ? "text-kGreen-200"
                                  : row == "On Check"
                                  ? "text-kYellow"
                                  : "text-kRed"
                                : row == "Safe"
                                ? "text-kGreen-200"
                                : "text-kRed"
                            } text-[12px] font-semibold`}
                          >
                            {row}
                          </td>
                        );
                      }
                      if (
                        Object.keys(obj)[idx].toLocaleLowerCase() ===
                        "assignedto"
                      ) {
                        return (
                          <td
                            key={idx}
                            className={`h-auto w-auto border-collapse border-b-2 border-kHeadTable px-2 py-3 text-center xl:px-4 text-kBlue-400 text-[12px] font-bold`}
                          >
                            {Object.values(obj)[7] == "Not Assigned" ? (
                              <button
                                onClick={() => onAssign!(obj.id)}
                                className="text-[12px] bg-kBlue-400 text-white rounded-full px-5 py-2 hover:bg-kBlue-300 active:bg-kBlue-200"
                              >
                                Assign
                              </button>
                            ) : (
                              row
                            )}
                          </td>
                        );
                      }
                      return (
                        <td
                          key={idx}
                          className="h-auto w-auto border-collapse border-b-2 border-kHeadTable px-2 py-3 text-center xl:px-4 text-kGrey text-[12px]"
                        >
                          {row}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && data.length == 0 ? (
        <div className="mt-12 text-center text-12 xl:text-14">
          Data Tidak Ditemukan
        </div>
      ) : null}
    </>
  );
}

export default Table;
