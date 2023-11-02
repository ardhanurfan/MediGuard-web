import { IoGridOutline } from "react-icons/io5";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { FaShippingFast } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import SideBarMenu from "./SideBarMenu";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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

  return (
    <div className="fixed w-[240px] min-h-screen bg-white pb-10 pt-6 flex flex-col justify-between">
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
        <SideBarMenu title={"Log Out"} to={"/"} index={5} currIndex={currIndex}>
          <FiLogOut />
        </SideBarMenu>
      </div>
    </div>
  );
}

export default SideBar;
