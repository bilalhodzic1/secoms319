import React, { useEffect, useState } from "react";
import items from "./chemicals.json";
const ChemicalShop = () => {
  const [cart, setCart] = useState([]);
  const [listItems, setListItems] = useState();
  const [filter, setFilter] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [currState, setCurrState] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  useEffect(() => {
    makeList();
  }, [filter]);
  useEffect(() => {
    makeList();
    total();
  }, [cart]);
  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    totalVal = totalVal * 1.07;
    setCartTotal(totalVal);
  };
  function howMany(id) {
    let hm = cart.filter((cartItem) => cartItem.id === id);
    return hm.length;
  }
  const checkoutTime = () => {
    setCurrState(1);
  };
  const returnTime = () => {
    setCurrState(0);
  };
  const addToCart = (product) => {
    setCart([...cart, product]);
    setCartCount(cartCount + 1);
  };
  const removeFromCart = (product) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== product.id);
    setCart(hardCopy);
    setCartCount(cartCount - 1);
  };
  const cartItems = cart.map((product) => (
    <div key={product.id}>
      <img src={product.imgLink} />
      {product.title}
    </div>
  ));
  const makeList = () => {
    let copyList = new Array();
    let copyCount = 0;
    for (let i in items) {
      let oldval = copyCount;
      for (let obj in items[i]) {
        if (
          items[i]["title"].toLowerCase().includes(filter.toLowerCase()) ||
          filter === ""
        ) {
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
            <div>Quantity ordered: {howMany(product.id)}</div>
          </div>
        </div>
      ))
    );
  };
  if (currState === 0) {
    return (
      <div>
        <div>
          <h1>Saya's Chemicals</h1>
          <div class="topnav">
            <button type="button" onClick={() => checkoutTime()} id="checkout">
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
              </form>
            </div>
          </div>
          <div class="grid-container">{listItems}</div>
        </div>
      </div>
    );
  } else if (currState === 1) {
    return (
      <div>
        <div>
          <h1>Saya's Chemicals</h1>
          <div class="topnav">
            <button type="button" onClick={() => returnTime()} id="checkout">
              Return
            </button>
          </div>
          <div class="grid-container">
            {cartItems}
            <div>{cartTotal}</div>
          </div>
        </div>
      </div>
    );
  }
};
export default ChemicalShop;
