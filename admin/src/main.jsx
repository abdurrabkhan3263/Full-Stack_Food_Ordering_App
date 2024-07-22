import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { AddCategory, AddItems, ListItems, Orders } from "./Pages/index.js";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route path="" element={<AddItems />} />
      <Route path="/category" element={<AddCategory />} />
      <Route path="/list" element={<ListItems />} />
      <Route path="/orders" element={<Orders />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>,
);
