import { Outlet } from "react-router-dom";
import Container from "./components/container/Container";
import "./App.css";
import { SideNav } from "./components";

function App() {
  return (
    <div className="grid h-screen grid-cols-[repeat(15,1fr)] grid-rows-12 px-8">
      <div className="col-span-full bg-red-500"></div>
      <div className="col-span-3 row-start-2 row-end-[15] bg-blue-500">
        {<SideNav />}
      </div>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
