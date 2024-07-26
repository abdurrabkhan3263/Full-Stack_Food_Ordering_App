import React, { useEffect, useState } from "react";
import { List, Orders, Plus } from "../assets/icons";
import { Button } from "./ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import useAppTheme from "@/context/context";

const navData = [
  {
    name: "Add Items",
    Icon: Plus,
    path: "",
  },
  {
    name: "List items",
    Icon: List,
    path: "/list",
  },
  {
    name: "Orders",
    Icon: Orders,
    path: "/orders",
  },
];

function SideNav() {
  const { mode, changeMode } = useAppTheme();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(mode);
  }, [mode]);

  return (
    <div className="flex h-full flex-col justify-between px-4 pb-6">
      <div>
        <h1 className="pt-6 text-xl font-medium">Admin Panel</h1>
        <div className="flex flex-col gap-y-8 pt-20">
          {navData.map(({ name, Icon, path }, index) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `flex gap-x-3 rounded-md py-4 pl-3 ${isActive ? "bg-sky-700 text-white" : "bg-stone-900 text-white"}`
              }
            >
              {<Icon />}
              {name}
            </NavLink>
          ))}
        </div>
      </div>
      <div>
        <Button onClick={() => changeMode()}>{mode.toUpperCase()}</Button>
      </div>
    </div>
  );
}

export default SideNav;
