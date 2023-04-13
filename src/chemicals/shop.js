import React, { useEffect, useState } from "react";
import items from "./chemicals.json";
const ChemicalShop = () => {
  const [cart, setCart] = useState([]);
  const [listItems, setListItems] = useState();
  const [filter, setFilter] = useState("");
  useEffect(() => {
    makeList();
  }, [filter]);
  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  const removeFromCart = (product) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== product.id);
    setCart(hardCopy);
  };
  const makeList = () => {
    let copyList = new Array();
    let copyCount = 0;
    for (let i in items) {
      let oldval = copyCount;
      for (let obj in items[i]) {
        if (items[i]["title"].includes(filter) || filter === "") {
          if (oldval === copyCount) {
            copyCount++;
            copyList[oldval] = {};
          }
          copyList[oldval][obj] = items[i][obj];
        }
      }
    }
    setListItems(
      copyList.map((product) => (
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
              <div>{product.price}</div>
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
      ))
    );
  };
  return (
    <div>
      <div>
        <h1>Saya's Chemicals</h1>
        <div class="topnav">
          <button type="button" id="checkout">
            Checkout
          </button>
          <div class="search-container">
            <form action="/action_page.php">
              <input
                type="text"
                placeholder="Search.."
                name="search"
                onChange={(e) => {
                  setFilter(e.target.value);
                  console.log(e.target.value);
                }}
              ></input>
              <button type="submit">
                <i>Submit</i>
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
