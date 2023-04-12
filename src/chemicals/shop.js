import React, { useState, useEffect } from "react";

const ChemicalShop = () => {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch("./chemicals.json");
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log("error", error);
    }
  };
  return;
};
export default ChemicalShop;
