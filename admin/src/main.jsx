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
import { AddItems, ListItems, Orders } from "./Pages/index.js";
import { AddCategory } from "./components/index.js";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner.jsx";
import EditProductForm from "./components/EditProductForm.jsx";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route path="" element={<AddItems />}>
        <Route path="/category" element={<AddCategory />} />
      </Route>
      <Route path="/list" element={<ListItems />}>
        <Route path="edit-product/:id" element={<EditProductForm />}>
          <Route path="add-category" element={<AddCategory />} />
        </Route>
      </Route>
      <Route path="/orders" element={<Orders />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={route} />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>,
);
