import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function Navbar() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const path = location.pathname;
  const [title, setTitle] = useState("");

  useEffect(() => {
    switch (path) {
      case "/":
        setTitle("Overview");
        break;
      case "/transaction":
        setTitle("Transaction");
        break;
      case "/mediguard":
        setTitle("MediGuard");
        break;
      case "/map":
        setTitle("Maps");
        break;
      default:
        setTitle("Overview");
        break;
    }
  }, [path]);

  return (
    <div className="px-2 fixed w-full bg-white h-16 xl:pl-[304px] xl:pr-6 flex items-center justify-between">
      <h1 className="font-bold xl:text-4xl text-kBlue-400 text-xl ml-12 xl:ml-0">
        {title}
      </h1>
      <div className="group relative">
        <div className="relative flex items-center">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.namaLengkap}&color=0F2341&background=33BDFE`}
            className="h-12 w-12 shrink-0 rounded-full bg-kGrey-100"
            alt="Profile"
          />
          <div className="ml-3">
            <p className="w-[60px] md:w-[120px] overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-bold text-kBlue-400">
              {user?.namaLengkap}
            </p>
            <p className="text-[14px] text-kBlue-400">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
