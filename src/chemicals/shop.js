import React, { useEffect, useState } from "react";
import items from "./chemicals.json";
const ChemicalShop = () => {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("");
  const [products, setProducts] = useState([]);
  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  const removeFromCart = (product) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== product.id);
    setCart(hardCopy);
  };
  const listItems = items.map((product) => (
    <div key={product.id}>
      <div>
        <div>
          <img src={product.imgLink} />
        </div>
        <div>
          <div>{product.title}</div>
          <div>{product.description}</div>
        </div>
        <div>
          <button
            type="button"
            variant="light"
            onClick={() => removeFromCart(product)}
          >
            {" "}
            -{" "}
          </button>{" "}
          <button
            type="button"
            variant="light"
            onClick={() => addToCart(product)}
          >
            {" "}
            +{" "}
          </button>
        </div>
        <div></div>
      </div>
    </div>
  ));
  return (
    <div>
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
        <div class="grid-container">{listItems}</div>
      </div>
    </div>
  );
};
export default ChemicalShop;
