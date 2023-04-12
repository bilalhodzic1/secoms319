import React, { useState, useEffect } from "react";

const ChemicalShop = () => {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("");
  const [products, setProducts] = useState([
    { id: "", title: "", price: "", description: "", imgLink: "" },
  ]);
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
  return (
    <div>
      <h1>Saya's Chemicals</h1>
      <div class="topnav">
        <a class="active" href="#home">
          Home
        </a>
        <div class="search-container">
          <form action="/action_page.php">
            <input type="text" placeholder="Search.." name="search"></input>
            <button type="submit">
              <i class="fa fa-search"></i>
            </button>
          </form>
        </div>
      </div>
      <div class="grid-container">
        <div class="grid-item">1</div>
        <div class="grid-item">2</div>
        <div class="grid-item">3</div>
        <div class="grid-item">4</div>
        <div class="grid-item">5</div>
        <div class="grid-item">6</div>
        <div class="grid-item">7</div>
        <div class="grid-item">8</div>
        <div class="grid-item">9</div>
      </div>
    </div>
  );
};
export default ChemicalShop;
