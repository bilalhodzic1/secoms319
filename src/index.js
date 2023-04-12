import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ChemicalShop from "./chemicals/shop.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChemicalShop />
  </React.StrictMode>
);
