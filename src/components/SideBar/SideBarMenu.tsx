import React from "react";
import { Link } from "react-router-dom";

function SideBarMenu({
  children,
  title,
  to,
  index,
  currIndex,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  to: string;
  index: number;
  currIndex: number;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}) {
  return (
    <Link
      onClick={onClick}
      className="w-full flex h-full hover:bg-slate-50 group"
      to={to}
    >
      <div
        className={`${
          index != currIndex ? "text-disable" : "text-kBlue-300"
        } flex w-full py-5 pl-9 gap-8 items-center group-hover:text-kBlue-200 group-active:text-kBlue-400`}
      >
        <div className="text-[20px]">{children}</div>
        <p className="font-semibold text-[16px]">{title}</p>
      </div>
      <div
        className={`${
          index != currIndex && "hidden"
        } w-1 bg-kBlue-300 group-hover:text-kBlue-200 group-active:text-kBlue-400`}
      ></div>
    </Link>
  );
}

export default SideBarMenu;
