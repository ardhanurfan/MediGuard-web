import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const path = location.pathname;
  const [title, setTitle] = useState("");

  useEffect(() => {
    switch (path) {
      case "/":
        setTitle("Overview");
        break;
      case "/task-list":
        setTitle("Task List");
        break;
      case "/conveyance":
        setTitle("Conveyance");
        break;
      default:
        setTitle("Overview");
        break;
    }
  }, [path]);

  return (
    <div className="fixed w-full bg-white h-16 pl-[304px] pr-6 flex items-center justify-between">
      <h1 className="font-bold text-4xl text-kBlue-400">{title}</h1>
      <div className="group relative">
        <div className="relative flex items-center">
          <img
            src={`https://ui-avatars.com/api/?name=${"Raka"}&color=0F2341&background=33BDFE`}
            className="h-12 w-12 shrink-0 rounded-full bg-kGrey-100"
            alt="Profile"
          />
          <div className="ml-3">
            <p className="w-[120px] overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-bold text-kBlue-400">
              {"Raka"}
            </p>
            <p className="text-[14px] text-kBlue-400">{"Admin"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
