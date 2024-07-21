import React, { useEffect, useState } from "react";
import { List, Orders, Plus } from "../assets/icons";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import useTheme from "@/context/context";

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
  const [activeBtn, setActiveBtn] = useState(0);
  const { mode, changeMode } = useTheme();
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
            <Button
              key={name}
              onClick={() => {
                setActiveBtn(index);
                navigate(path);
              }}
              className={`py-6 ${activeBtn === index ? "bg-slate-400" : "bg-black"}`}
              variant={`${mode === "dark" ? "dark" : "default"}`}
            >
              {<Icon />}
              {name}
            </Button>
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
