import React, { useState } from "react";
import { List, Orders, Plus } from "../assets/icons";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <div className="px-4 pt-4">
      <h1 className="text-xl font-medium">Admin Panel</h1>
      <div className="flex flex-col gap-y-8 pt-20">
        {navData.map(({ name, Icon, path }, index) => (
          <Button
            key={name}
            onClick={() => {
              setActiveBtn(index);
              navigate(path);
            }}
            className={`py-6 ${activeBtn === index ? "bg-slate-400" : "bg-black"}`}
          >
            {<Icon />}
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
