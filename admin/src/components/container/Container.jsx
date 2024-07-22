import useTheme from "@/context/context";
import React from "react";

function Container({ children }) {
  const { mode } = useTheme();
  return (
    <div
      className={`col-start-4 col-end-[16] row-start-2 row-end-[15] ${mode === "light" ? "bg-slate-100" : "bg-stone-950 text-white"} relative pl-12 pt-4`}
    >
      {children}
    </div>
  );
}

export default Container;
