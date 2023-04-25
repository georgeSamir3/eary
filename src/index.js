import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
// import { BrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <BrowserRouter>
  //   <React.StrictMode>
  //     <App />
  //   </React.StrictMode>
  // </BrowserRouter>
  <RouterProvider router={routes}></RouterProvider>
);
