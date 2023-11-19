import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Paginate({
  totalPages,
  current,
  totalData,
  dataLimit,
}: {
  totalPages: number;
  totalData: number;
  dataLimit: number;
  current: (x: number) => void | undefined;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    current(page);
  };

  const pushPage = (pageNumbers: JSX.Element[], i: number) => {
    pageNumbers.push(
      <li
        key={i}
        className={`cursor-pointer px-2 rounded-lg ${
          currentPage === i
            ? "border-2 border-kBlue-200"
            : "hover:bg-kBlue-200 hover:text-white border-2 border-kHeadTable"
        }`}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </li>
    );
  };

  const renderPage = () => {
    const pageNumbers: JSX.Element[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (totalPages < 5) {
        pushPage(pageNumbers, i);
      } else {
        if (currentPage < totalPages - 3) {
          if (
            (i < currentPage + 3 && i >= currentPage - 1) ||
            i == totalPages
          ) {
            pushPage(pageNumbers, i);
          } else if (i == currentPage + 3) {
            pageNumbers.push(<li>...</li>);
          }
        } else {
          if (i >= totalPages - 3 || i <= totalPages - currentPage + 1) {
            pushPage(pageNumbers, i);
          } else if (i == totalPages - 4) {
            pageNumbers.push(<li>...</li>);
          }
        }
      }
    }
    return pageNumbers;
  };
  return (
    <>
      <div className="mt-8 flex w-full grow flex-col items-center justify-end xl:flex-row xl:items-end xl:justify-between">
        <p className="hidden px-3 xl:block  xl:text-[14px] text-kGrey">
          {`Menunjukkan Entri ${
            totalData == 0 ? 0 : currentPage * dataLimit - (dataLimit - 1)
          } sampai ${
            totalData - currentPage * dataLimit > 0
              ? currentPage * dataLimit
              : totalData
          } dari ${totalData}`}
        </p>
        <ul className="flex w-auto items-center justify-center gap-2">
          <li
            className={
              currentPage > 1
                ? "html flex h-6 w-6 cursor-pointer items-center justify-center bg-kBlue-400 text-white hover:bg-kBlue-300 active:bg-kBlue-200 rounded-lg"
                : "hidden"
            }
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <IoIosArrowBack />
          </li>
          {renderPage()}
          <li
            className={
              currentPage < totalPages
                ? "html flex h-6 w-6 cursor-pointer items-center justify-center bg-kBlue-400 text-white hover:bg-kBlue-300 active:bg-kBlue-200 rounded-lg"
                : "hidden"
            }
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <IoIosArrowForward />
          </li>
        </ul>
        <p className="visible px-3 text-[12px] text-kText xl:invisible text-kGrey">
          {`Menunjukkan Entri ${
            totalData == 0 ? 0 : currentPage * dataLimit - (dataLimit - 1)
          } sampai ${
            totalData - currentPage * dataLimit > 0
              ? currentPage * dataLimit
              : totalData
          } dari ${totalData}`}
        </p>
      </div>
    </>
  );
}

export default Paginate;
