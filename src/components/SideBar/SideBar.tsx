import { IoGridOutline } from "react-icons/io5";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { FaShippingFast } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import SideBarMenu from "./SideBarMenu";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useEventListener } from "usehooks-ts";

function SideBar() {
  const location = useLocation();
  const path = location.pathname;
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    switch (path) {
      case "/":
        setCurrIndex(0);
        break;
      case "/task-list":
        setCurrIndex(1);
        break;
      case "/conveyance":
        setCurrIndex(2);
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
            title={"List Tasks"}
            to={"/task-list"}
            index={1}
            currIndex={currIndex}
          >
            <HiSquare3Stack3D />
          </SideBarMenu>
          <p className="text-kBlue-300 mt-10 font-semibold pl-7">
            Distribution Monitoring
          </p>
          <SideBarMenu
            title={"Conveyance"}
            to={"/conveyance"}
            index={2}
            currIndex={currIndex}
          >
            <FaShippingFast />
          </SideBarMenu>
          <SideBarMenu title={"Maps"} to={"/"} index={3} currIndex={currIndex}>
            <FiMapPin />
          </SideBarMenu>
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
            to={"/"}
            index={5}
            currIndex={currIndex}
          >
            <FiLogOut />
          </SideBarMenu>
        </div>
      </div>
    </>
  );
}

export default SideBar;
