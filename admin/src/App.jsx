import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Container from "./components/container/Container";
import { SideNav } from "./components";
import { ThemeProvider } from "./context/context";
import "./App.css";

function App() {
  const [mode, setMode] = useState("");
  const changeMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };
  useEffect(() => {
    if (mode?.trim()) {
      localStorage.setItem("theme", JSON.stringify(mode));
    }
  }, [mode]);
  useEffect(() => {
    const mode = JSON.parse(localStorage.getItem("theme"));
    setMode(mode);
  }, []);

  return (
    <ThemeProvider value={{ mode, changeMode }}>
      <div
        className={`relative grid h-screen grid-cols-[repeat(15,1fr)] grid-rows-12`}
      >
        <div
          className={`col-span-full ${mode === "light" ? "bg-red-500" : "bg-gray-800 text-white"}`}
        ></div>
        <div
          className={`col-span-3 row-start-2 row-end-[15] ${mode === "light" ? "bg-slate-300" : "bg-black text-white"} pl-8`}
        >
          {<SideNav />}
        </div>
        <Container>
          <Outlet />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
