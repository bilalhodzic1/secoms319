import React, { useEffect, useState } from "react";
import items from "./chemicals.json";
const ChemicalShop = () => {
  const [cart, setCart] = useState([]);
  const [listItems, setListItems] = useState();
  const [filter, setFilter] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [currState, setCurrState] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [orderItems, setOrderItems] = useState([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [Address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
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
  const orderTime = () => {
    setCurrState(2);
  };
  const browseTime = () => {
    setCart([]);
    setCurrState(0);
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
  const makeOrderlist = () => {
    let copyList = [];
    let copyCount = 0;
    for (let i in items) {
      let oldval = copyCount;
      for (let obj in items[i]) {
        if (howMany(items[i]["id"]) != 0) {
          if (oldval === copyCount) {
            copyCount++;
            copyList[oldval] = {};
          }
          copyList[oldval][obj] = items[i][obj];
        }
      }
    }
    setOrderItems(
      copyList.map((product) => (
        <div key={product.id}>
          <img src={product.imgLink} />
          {product.title}
          <div>Quantity ordered: {howMany(product.id)}</div>
        </div>
      ))
    );
  };
  const makeList = () => {
    let copyList = [];
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
          <div class="grid-container">{cartItems}</div>
          <div>{cartTotal}</div>
        </div>
        <div>
          <form>
            <label for="fullname">Full Name:</label>
            <input type="text" id="fullname" required></input>
            <label for="email">Email:</label>
            <input type="email" id="email" required></input>
            <label for="card">Card:</label>
            <input type="text" id="card" required></input>
            <label for="address">Address:</label>
            <input type="text" id="address" required></input>
            <label for="city">City:</label>
            <input type="text" id="city" required></input>
            <label for="state">State:</label>
            <input type="text" id="state" required></input>
            <label for="zip">Zip:</label>
            <input type="text" id="zip" required maxLength={5}></input>
            <input
              type="text"
              id="fullname"
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            ></input>
            <label for="email">Email:</label>
            <input
              type="text"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
                console.log(e.target.value);
              }}
            ></input>
            <input type="email" id="email" required></input>
            <label for="card">Card:</label>
            <input
              type="text"
              id="card"
              onChange={(e) => {
                setCard(e.target.value);
                console.log(e.target.value);
              }}
            ></input>
            <input type="text" id="card" required></input>
            <label for="address">Address:</label>
            <input
              type="text"
              id="address"
              onChange={(e) => {
                setAddress(e.target.value);
                console.log(e.target.value);
              }}
            ></input>
            <input type="text" id="address" required></input>
            <label for="city">City:</label>
            <input
              type="text"
              id="city"
              onChange={(e) => {
                setCity(e.target.value);
                console.log(e.target.value);
              }}
            ></input>
            <input type="text" id="city" required></input>
            <label for="state">State:</label>
            <input
              type="text"
              id="state"
              onChange={(e) => {
                setState(e.target.value);
                console.log(e.target.value);
              }}
            ></input>
            <input type="text" id="state" required></input>
            <label for="zip">Zip:</label>
            <input
              type="text"
              id="zip"
              onChange={(e) => {
                setZip(e.target.value);
                console.log(e.target.value);
              }}
            ></input>
            <input type="text" id="zip" required maxLength={5}></input>
          </form>
          <button
            type="button"
            onClick={() => {
              makeOrderlist();
              orderTime();
              makeList();
            }}
          >
            Order
          </button>
        </div>
      </div>
    );
  } else if (currState == 2) {
    return (
      <div>
        <div>
          <h1>Saya's Chemicals</h1>
          <div class="topnav">
            <button type="button" onClick={() => browseTime()} id="checkout">
              Back to browse
            </button>
          </div>
          <div class="grid-container">{orderItems}</div>
          <div>{cartTotal}</div>
          <div>{fullName}</div>
          <div>{email}</div>
          <div>{card}</div>
          <div>{Address}</div>
          <div>{city}</div>
          <div>{state}</div>
          <div>{zip}</div>
        </div>
      </div>
    );
  }
};
export default ChemicalShop;
