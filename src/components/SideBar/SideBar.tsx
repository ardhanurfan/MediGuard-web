import { IoGridOutline } from "react-icons/io5";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { FaShippingFast } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { RiAccountCircleLine } from "react-icons/ri";
import SideBarMenu from "./SideBarMenu";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useEventListener } from "usehooks-ts";
import Cookies from "js-cookie";
import { toastError, toastSuccess } from "../Toast/Toast";
import { UserContext } from "../../context/UserContext";

function SideBar() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const path = location.pathname;
  const [currIndex, setCurrIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    try {
      Cookies.remove("token_mediguard");
      toastSuccess("Log Out Successfully");
    } catch (error) {
      toastError("Logout Gagal");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    switch (path) {
      case "/":
        setCurrIndex(0);
        break;
      case "/transaction":
        setCurrIndex(1);
        break;
      case "/mediguard":
        setCurrIndex(2);
        break;
      case "/map":
        setCurrIndex(3);
        break;
      case "/accounts":
        setCurrIndex(6);
        break;
      default:
        setCurrIndex(0);
        break;
    }
  }, [path]);

  const [navOpen, setNavOpen] = useState(false);
  const documentRef = useRef<Document>(document);
  const onClickHamburger = (event: Event) => {
    let cekHamburger = true;
    const doc = document.getElementsByClassName("hamburger");
    for (let index = 0; index < doc.length; index++) {
      cekHamburger = cekHamburger && event.target != doc[index];
    }
    if (cekHamburger) {
      setNavOpen(false);
    }
  };
  useEventListener("click", onClickHamburger, documentRef);

  return (
    <>
      <button
        type="button"
        className={`${
          navOpen ? "-translate-x-full" : "translate-x-0"
        } bg-kBlue-200 hamburger fixed -z-1 h-[40px] w-[40px] cursor-pointer xl:hidden top-3 left-2 duration-200 ease-in-out`}
        onClick={() => setNavOpen(!navOpen)}
      >
        <span
          className={`${
            navOpen
              ? "top-[1.2em] h-[2px] rotate-[135deg] transition"
              : "top-[0.7em] h-[3px]"
          } hamburger line absolute left-0 right-0 mx-auto h-[3px] w-[20px] rounded-xl bg-white duration-300 ease-in-out`}
        ></span>
        <span
          id="span2"
          className={`${
            navOpen ? "h-[2px] scale-0 transition" : "top-[1.2em] h-[3px]"
          } hamburger line absolute left-0 right-0 mx-auto h-[3px] w-[20px] rounded-xl bg-white duration-300 ease-in-out`}
        ></span>
        <span
          id="span3"
          className={`${
            navOpen
              ? "top-[1.2em] h-[2px] rotate-45 transition"
              : "top-[1.7em] h-[3px]"
          } hamburger line absolute left-0 right-0 mx-auto h-[3px] w-[20px] rounded-xl bg-white duration-300 ease-in-out`}
        ></span>
      </button>
      <div
        className={`${
          navOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0 fixed w-[240px] min-h-screen bg-white pb-10 pt-6 flex flex-col justify-between ease-in-out duration-300`}
      >
        <div>
          <Link to="/">
            <img src="/assets/logo.svg" className="w-[240px] pb-6" alt="" />
          </Link>
          <SideBarMenu
            title={"Overview"}
            to={"/"}
            index={0}
            currIndex={currIndex}
          >
            <IoGridOutline />
          </SideBarMenu>
          <p className="text-kBlue-300 mt-10 font-semibold pl-8">
            To-be Distributed
          </p>
          <SideBarMenu
            title={"Transaction"}
            to={"/transaction"}
            index={1}
            currIndex={currIndex}
          >
            <HiSquare3Stack3D />
          </SideBarMenu>
          <p className="text-kBlue-300 mt-10 font-semibold pl-7">
            Distribution Monitoring
          </p>
          <SideBarMenu
            title={"MediGuard"}
            to={"/mediguard"}
            index={2}
            currIndex={currIndex}
          >
            <FaShippingFast />
          </SideBarMenu>
          <SideBarMenu
            title={"Maps"}
            to={"/map"}
            index={3}
            currIndex={currIndex}
          >
            <FiMapPin />
          </SideBarMenu>

          {user?.role == "superadmin" && (
            <>
              <p className="text-kBlue-300 mt-10 font-semibold pl-7">
                Management
              </p>
              <SideBarMenu
                title={"Accounts"}
                to={"/accounts"}
                index={6}
                currIndex={currIndex}
              >
                <RiAccountCircleLine />
              </SideBarMenu>
            </>
          )}
        </div>
        <div>
          <SideBarMenu
            title={"Settings"}
            to={"/"}
            index={4}
            currIndex={currIndex}
          >
            <FiSettings />
          </SideBarMenu>
          <SideBarMenu
            title={"Log Out"}
            to={"/login"}
            index={5}
            currIndex={currIndex}
            onClick={logout}
          >
            {isLoading ? (
              <svg
                className="mr-3 h-5 w-5 animate-spin"
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
            ) : (
              <FiLogOut />
            )}
          </SideBarMenu>
        </div>
      </div>
    </>
  );
}

export default SideBar;
