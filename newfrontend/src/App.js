import logo from "./logo.svg";
import "./App.css";

import { useState, useEffect } from "react";
function App() {
  const [Military, setMilitary] = useState([]);
  const [Chemical, setChemical] = useState([]);
  const [oneProduct, setOneProduct] = useState([]);
  const [viewer2, setViewer2] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);
  const [currState, setCurrState] = useState(-1);

  //VIEW CHANGES
  const homeTime = () => {
    setCurrState(-1);
  };
  const addTime = () => {
    setCurrState(1);
  };
  const updateTime = () => {
    setCurrState(2);
  };
  const deleteTime = () => {
    setCurrState(3);
  };
  const readTime = () => {
    setCurrState(0);
  };
  const infoTime = () => {
    setCurrState(4);
  };
  const chemicalTime = () => {
    setCurrState(5);
  };
  const addChemicalTime = () => {
    setCurrState(6);
  };
  const weaponTime = () => {
    setCurrState(7);
  };
  const vehicleTime = () => {
    setCurrState(8);
  };
  const miscTime = () => {
    setCurrState(9);
  };
  const allMilitaryTime = () => {
    setCurrState(10);
  };

  //REFRESH STORE LISTS
  useEffect(() => {
    getAllChemicals();
  }, [Chemical]);
  useEffect(() => {
    getAllMilitary();
  }, [Military]);
  //ROTATING ROLLBACK EFFECT
  useEffect(() => {
    getAllMilitary();
  }, [checked4]);
  //ADD STUFF TEMPLATE VARIABLE
  const [addNewProduct, setAddNewProduct] = useState({
    _id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://127.0.0.1:4000/images/",
  });
  const [addNewChemical, setAddNewChemical] = useState({
    _id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://127.0.0.1:4000/images/",
  });
  //UPDATE MILITARY TEMPLATE
  const [updateProduct, setupdateProduct] = useState({
    _id: 0,
    title: "notitle",
    price: -1,
    description: "nodesc",
    category: "nocat",
    image: "http://127.0.0.1:4000/images/",
  });
  //GENERATES PRODUCT LIST FOR MILITARY

  const showAllItems = Military.map((el) => (
    <div key={el._id} class="item">
      <img src={el.image} width={300} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      <br />
    </div>
  ));
  //GENERATED PRODUCT LIST FOR CHEMICALS
  const showAllchemicals = Chemical.map((el) => (
    <div key={el._id} class="item">
      <img src={el.image} width={300} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      <br />
    </div>
  ));
  //FETCHES MILITARY PRODUCTS FROM DATABASE
  function getAllMilitary() {
    fetch("http://localhost:4000/military")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setMilitary(data);
      });
  }
  //FETCHES CHEMICALS FROM DATABASE
  function getAllChemicals() {
    fetch("http://localhost:4000/chemical")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setChemical(data);
      });
  }
  //GET SINGULAR MILITARY FROM DATABASE
  function getOneProduct(id) {
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://localhost:4000/" + id + "/military")
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          const dataArr = [];
          dataArr.push(data);
          setOneProduct(dataArr);
        });
      setViewer2(!viewer2);
    } else {
      console.log("Wrong number of Product id.");
    }
  }

  //GENERATE SINGULAR ITEM FOR DISPLAT
  const showOneItem = oneProduct.map((el) => (
    <div key={el._id}>
      <img src={el.image} width={300} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
    </div>
  ));
  //HANDLES CHANGE IN TYPING WJEN ADDING A NEW ITEM
  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_id") {
      setAddNewProduct({ ...addNewProduct, _id: value });
    } else if (evt.target.name === "title") {
      setAddNewProduct({ ...addNewProduct, title: value });
    } else if (evt.target.name === "price") {
      setAddNewProduct({ ...addNewProduct, price: value });
    } else if (evt.target.name === "description") {
      setAddNewProduct({ ...addNewProduct, description: value });
    } else if (evt.target.name === "category") {
      setAddNewProduct({ ...addNewProduct, category: value });
    } else if (evt.target.name === "image") {
      const temp = value;
      setAddNewProduct({ ...addNewProduct, image: temp });
    }
  }
  //HANDLES SAME THING FOR CHEMICAL
  function handleChangeChemical(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_idchemical") {
      setAddNewChemical({ ...addNewChemical, _id: value });
    } else if (evt.target.name === "titlechemical") {
      setAddNewChemical({ ...addNewChemical, title: value });
    } else if (evt.target.name === "pricechemical") {
      setAddNewChemical({ ...addNewChemical, price: value });
    } else if (evt.target.name === "descriptionchemical") {
      setAddNewChemical({ ...addNewChemical, description: value });
    } else if (evt.target.name === "categorychemical") {
      setAddNewChemical({ ...addNewChemical, category: value });
    } else if (evt.target.name === "imagechemical") {
      const temp = value;
      setAddNewChemical({ ...addNewChemical, image: temp });
    }
  }
  //HANDLES FORM CHANGE FOR UPDATING
  function handleupdateChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_idupdate") {
      setupdateProduct({ ...updateProduct, _id: value });
    } else if (evt.target.name === "priceupdate") {
      setupdateProduct({ ...updateProduct, price: value });
    }
  }
  //HANDLES SUBMISSION OF UPDATE TO DATABASE OF MILITARY
  function handleupdateOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/Update/military", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new product completed");
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
    getAllMilitary();
  }
  //HANDLES ADDING A NEW MILITARY ITEM SUBMIT BUTTON TO DATABASE
  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/insert/military", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new military completed");
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
  }
  //HANDLES ADDING A NEW CHEMICAL TO DATABASE
  function handleOnSubmitChemical(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/insert/chemical", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewChemical),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new Chemical completed");
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
  }
  //ROTATING PRODUCT FUNCTION NEXT
  function getOneByOneProductNext() {
    if (Military.length > 0) {
      if (index === Military.length - 1) setIndex(0);
      else setIndex(index + 1);
      if (Military.length > 0) setChecked4(true);
      else setChecked4(false);
    }
  }
  //ROTATING PRODCUT FUNCTION PREVIOUS
  function getOneByOneProductPrev() {
    if (Military.length > 0) {
      if (index === 0) setIndex(Military.length - 1);
      else setIndex(index - 1);
      if (Military.length > 0) setChecked4(true);
      else setChecked4(false);
    }
  }
  //HANDLES DELETING FROM DATABASE
  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:4000/delete/military", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: deleteid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete a military completed : ", deleteid);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
    setChecked4(!checked4);
  }
  //RETURN VIEWS
  //HOME
  if (currState === -1) {
    return (
      <div class="home">
        <div class="header">
          <h1>Saya’s Chemical and Military Surplus Emporium</h1>
          <div class="btn-container">
            <button type="button">Sign Up</button>
            <button type="button">Login</button>
          </div>
        </div>
        <div class="topnav">
          <button type="button" onClick={() => homeTime()} id="checkout">
            Home
          </button>
          <button type="button" onClick={() => allMilitaryTime()} id="checkout">
            Military Store
          </button>
          <button type="button" onClick={() => chemicalTime()} id="checkout">
            Chemical Store
          </button>
          <button type="button" onClick={() => infoTime()} id="checkout">
            Info
          </button>
          <button type="button" onClick={() => readTime()} id="checkout">
            Read
          </button>
        </div>
        <div class="grid-container">
          <div class="divItem1">
            <img
              src="http://127.0.0.1:4000/images/militaryLogo.jpg"
              alt="Saya's Military Surplus Logo"
              width="550"
              height="450"
            ></img>
            <button
              type="button"
              onClick={() => allMilitaryTime()}
              id="checkout"
            >
              Enter Saya's Military Surplus
            </button>
          </div>
          <div class="divItem2">
            <img
              src="http://127.0.0.1:4000/images/chemicalLogo.jpg"
              alt="Saya's Chemical Emporium Logo"
              width="550"
              height="450"
            ></img>
            <button type="button" onClick={() => chemicalTime()} id="checkout">
              Enter Saya's Chemical Emporium
            </button>
          </div>
        </div>
        <div class="footer">
          <p>Footer</p>
        </div>
      </div>
    );
  } else if (currState === 0) {
    return (
      <div class="index">
        <div class="header">
          <h1>Saya’s Chemical and Military Surplus Emporium</h1>
          <div class="btn-container">
            <button type="button">Sign Up</button>
            <button type="button">Login</button>
          </div>
        </div>
        <div class="topnav">
          <button type="button" onClick={() => homeTime()} id="checkout">
            Home
          </button>
          <button type="button" onClick={() => chemicalTime()} id="checkout">
            All Chemicals
          </button>
          <button type="button" onClick={() => addChemicalTime()} id="checkout">
            Add Chemical
          </button>
          <button
            type="button"
            onClick={() => {
              addTime();
            }}
            id="checkout"
          >
            Add Product
          </button>
          <button type="button" onClick={() => updateTime()} id="checkout">
            Update Product
          </button>
          <button type="button" onClick={() => deleteTime()} id="checkout">
            Delete Product
          </button>
          <button type="button" onClick={() => infoTime()} id="checkout">
            Info
          </button>
        </div>
        {<div class="products">{showAllItems}</div>}
        <div class="footer">
          <p>Footer</p>
        </div>
      </div>
    );
  }
  //ADDING A NEW CHEMICAL
  else if (currState === 6) {
    return (
      <div class="addProduct">
        <div class="header">
          <h1>Saya’s Chemical and Military Surplus Emporium</h1>
          <div class="btn-container">
            <button type="button">Sign Up</button>
            <button type="button">Login</button>
          </div>
        </div>
        <div class="topnav">
          <button type="button" onClick={() => homeTime()} id="checkout">
            Home
          </button>
          <button type="button" onClick={() => chemicalTime()} id="checkout">
            All Chemicals
          </button>
          <button type="button" onClick={() => addChemicalTime()} id="checkout">
            Add Chemical
          </button>
          <button type="button" onClick={() => addTime()} id="checkout">
            Add Product
          </button>
          <button type="button" onClick={() => updateTime()} id="checkout">
            Update Product
          </button>
          <button type="button" onClick={() => deleteTime()} id="checkout">
            Delete Product
          </button>
          <button type="button" onClick={() => infoTime()} id="checkout">
            Info
          </button>
        </div>
        <h3>Add a new Chemical:</h3>
        <form action="">
          <label for="_id">ID? </label>
          <input
            type="number"
            placeholder="id?"
            name="_idchemical"
            value={addNewChemical._id}
            onChange={handleChangeChemical}
          />
          <br></br>
          <label for="title">Title? </label>
          <input
            type="text"
            placeholder="title?"
            name="titlechemical"
            value={addNewChemical.title}
            onChange={handleChangeChemical}
          />
          <br></br>
          <label for="price">Price? </label>
          <input
            type="number"
            placeholder="price?"
            name="pricechemical"
            value={addNewChemical.price}
            onChange={handleChangeChemical}
          />
          <br></br>
          <label for="description">Description? </label>
          <input
            type="text"
            placeholder="desc?"
            name="descriptionchemical"
            value={addNewChemical.description}
            onChange={handleChangeChemical}
          />
          <br></br>
          <label for="category">Category? </label>
          <input
            type="text"
            placeholder="category?"
            name="categorychemical"
            value={addNewChemical.category}
            onChange={handleChangeChemical}
          />
          <br></br>
          <label for="image">IMG Link? </label>
          <input
            type="text"
            placeholder="image?"
            name="imagechemical"
            value={addNewChemical.image}
            onChange={handleChangeChemical}
          />
          <br></br>
          <button type="submit" onClick={handleOnSubmitChemical}>
            Submit
          </button>
        </form>
        <div class="footer">
          <p>Footer</p>
        </div>
      </div>
    );
  }
  //LOOK AT THE CHEMICALS VIEW
  else if (currState === 5) {
    return (
      <div class="index">
        <div class="chemHeader">
          <h1>Saya’s Chemical Emporium</h1>
          <div class="btn-container">
            <button type="button">Sign Up</button>
            <button type="button">Login</button>
          </div>
        </div>
        <div class="topnav">
          <button type="button" onClick={() => homeTime()} id="checkout">
            Home
          </button>
          <button type="button" onClick={() => chemicalTime()} id="checkout">
            All Chemicals
          </button>
          <button type="button" onClick={() => infoTime()} id="checkout">
            Info
          </button>
          <input type="text" placeholder="Search..."></input>
        </div>
        <div class="allChemContent">
          <h1>WELCOME!</h1>
          <img
            src="http://127.0.0.1:4000/images/chemicalLogo.jpg"
            alt="Saya's Chemical Emporium Logo"
            width="800"
            height="650"
          ></img>
          <h1>All Items</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
        {<div class="products">{showAllchemicals}</div>}
        <div class="footer">
          <p>Footer</p>
        </div>
      </div>
    );
  }
  //WEAPONS VIEW
  else if (currState === 7) {
    return (
      <div class="military" id="weaponHome">
        <div class="milHeader">
          <h1>Saya’s Military Surplus</h1>
          <div class="btn-container">
            <button type="button">Sign Up</button>
            <button type="button">Login</button>
          </div>
        </div>
        <div class="topnav">
          <button type="button" onClick={() => homeTime()} id="checkout">
            Home
          </button>
          <button type="button" onClick={() => allMilitaryTime()} id="checkout">
            All Military
          </button>
          <button type="button" onClick={() => weaponTime()} id="checkout">
            Weapons
          </button>
          <button type="button" onClick={() => vehicleTime()} id="checkout">
            Vehicles
          </button>
          <button type="button" onClick={() => miscTime()} id="checkout">
            Misc.
          </button>
          <button type="button" onClick={() => infoTime()} id="checkout">
            Info
          </button>
          <input type="text" placeholder="Search..."></input>
        </div>
        <p>Weapons</p>
        <div class="footer">
          <p>Footer</p>
        </div>
      </div>
    );
  } else if (currState === 8) {
    return (
      <div class="military" id="vehicleHome">
        <div class="milHeader">
          <h1>Saya’s Military Surplus</h1>
          <div class="btn-container">
            <button type="button">Sign Up</button>
            <button type="button">Login</button>
          </div>
        </div>
        <div class="topnav">
          <button type="button" onClick={() => homeTime()} id="checkout">
            Home
          </button>
          <button type="button" onClick={() => allMilitaryTime()} id="checkout">
            All Military
          </button>
          <button type="button" onClick={() => weaponTime()} id="checkout">
            Weapons
          </button>
          <button type="button" onClick={() => vehicleTime()} id="checkout">
            Vehicles
          </button>
          <button type="button" onClick={() => miscTime()} id="checkout">
            Misc.
          </button>
          <button type="button" onClick={() => infoTime()} id="checkout">
            Info
          </button>
          <input type="text" placeholder="Search..."></input>
        </div>
        <p>Vehicles</p>
        <div class="footer">
          <p>Footer</p>
        </div>
      </div>
    );
  } else if (currState === 9) {
    return (
      <div class="military" id="miscHome">
        <div class="milHeader">
          <h1>Saya’s Military Surplus</h1>
          <div class="btn-container">
            <button type="button">Sign Up</button>
            <button type="button">Login</button>
          </div>
        </div>
        <div class="topnav">
          <button type="button" onClick={() => homeTime()} id="checkout">
            Home
          </button>
          <button type="button" onClick={() => allMilitaryTime()} id="checkout">
            All Military
          </button>
          <button type="button" onClick={() => weaponTime()} id="checkout">
            Weapons
          </button>
          <button type="button" onClick={() => vehicleTime()} id="checkout">
            Vehicles
          </button>
          <button type="button" onClick={() => miscTime()} id="checkout">
            Misc.
          </button>
          <button type="button" onClick={() => infoTime()} id="checkout">
            Info
          </button>
          <input type="text" placeholder="Search..."></input>
        </div>
        <p>Misc</p>
        <div class="footer">
          <p>Footer</p>
        </div>
      </div>
    );
  } else if (currState === 10) {
    return (
      <div class="military" id="allMilitary">
        <div class="milHeader">
          <h1>Saya’s Military Surplus</h1>
          <div class="btn-container">
            <button type="button">Sign Up</button>
            <button type="button">Login</button>
          </div>
        </div>
        <div class="topnav">
          <button type="button" onClick={() => homeTime()} id="checkout">
            Home
          </button>
          <button type="button" onClick={() => allMilitaryTime()} id="checkout">
            All Military
          </button>
          <button type="button" onClick={() => weaponTime()} id="checkout">
            Weapons
          </button>
          <button type="button" onClick={() => vehicleTime()} id="checkout">
            Vehicles
          </button>
          <button type="button" onClick={() => miscTime()} id="checkout">
            Misc.
          </button>
          <button type="button" onClick={() => infoTime()} id="checkout">
            Info
          </button>
          <input type="text" placeholder="Search..."></input>
        </div>
        <div class="allMilContent">
          <h1>WELCOME!</h1>
          <img
            src="http://127.0.0.1:4000/images/militaryLogo.jpg"
            alt="Saya's Military Surplus Logo"
            width="900"
            height="750"
          ></img>
          <h1>All Items</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
        {<div class="products">{showAllItems}</div>}
        <div class="footer">
          <p>Footer</p>
        </div>
      </div>
    );
  } else if (currState === 1) {
    return (
      <div class="addProduct">
        <div class="header">
          <h1>Saya’s Chemical and Military Surplus Emporium</h1>
          <div class="btn-container">
            <button type="button">Sign Up</button>
            <button type="button">Login</button>
          </div>
        </div>
        <div class="topnav">
          <button type="button" onClick={() => homeTime()} id="checkout">
            Home
          </button>
          <button type="button" onClick={() => chemicalTime()} id="checkout">
            All Chemicals
          </button>
          <button type="button" onClick={() => addChemicalTime()} id="checkout">
            Add Chemical
          </button>
          <button type="button" onClick={() => addTime()} id="checkout">
            Add Product
          </button>
          <button type="button" onClick={() => updateTime()} id="checkout">
            Update Product
          </button>
          <button type="button" onClick={() => deleteTime()} id="checkout">
            Delete Product
          </button>
          <button type="button" onClick={() => infoTime()} id="checkout">
            Info
          </button>
        </div>
        <h3>Add a new Product:</h3>
        <form action="">
          <label for="_id">ID? </label>
          <input
            type="number"
            placeholder="id?"
            name="_id"
            value={addNewProduct._id}
            onChange={handleChange}
          />
          <br></br>
          <label for="title">Title? </label>
          <input
            type="text"
            placeholder="title?"
            name="title"
            value={addNewProduct.title}
            onChange={handleChange}
          />
          <br></br>
          <label for="price">Price? </label>
          <input
            type="number"
            placeholder="price?"
            name="price"
            value={addNewProduct.price}
            onChange={handleChange}
          />
          <br></br>
          <label for="description">Description? </label>
          <input
            type="text"
            placeholder="desc?"
            name="description"
            value={addNewProduct.description}
            onChange={handleChange}
          />
          <br></br>
          <label for="category">Category? </label>
          <input
            type="text"
            placeholder="category?"
            name="category"
            value={addNewProduct.category}
            onChange={handleChange}
          />
          <br></br>
          <label for="image">IMG Link? </label>
          <input
            type="text"
            placeholder="image?"
            name="image"
            value={addNewProduct.image}
            onChange={handleChange}
          />
          <br></br>
          <button type="submit" onClick={handleOnSubmit}>
            Submit
          </button>
        </form>
        <div class="footer">
          <p>Footer</p>
        </div>
      </div>
    );
  }
  //DELETE VIEW
  else if (currState === 3) {
    return (
      <div class="delete">
        <div class="header">
          <h1>Saya’s Chemical and Military Surplus Emporium</h1>
          <div class="btn-container">
            <button type="button">Sign Up</button>
            <button type="button">Login</button>
          </div>
        </div>
        <div class="topnav">
          <button type="button" onClick={() => homeTime()} id="checkout">
            Home
          </button>
          <button type="button" onClick={() => chemicalTime()} id="checkout">
            All Chemicals
          </button>
          <button type="button" onClick={() => addChemicalTime()} id="checkout">
            Add Chemical
          </button>
          <button type="button" onClick={() => addTime()} id="checkout">
            Add Product
          </button>
          <button type="button" onClick={() => updateTime()} id="checkout">
            Update Product
          </button>
          <button type="button" onClick={() => deleteTime()} id="checkout">
            Delete Product
          </button>
          <button type="button" onClick={() => infoTime()} id="checkout">
            Info
          </button>
        </div>
        <h3>Delete one Product:</h3>
        {checked4 && (
          <div key={Military[index]._id} class="deleteProduct">
            <img src={Military[index].image} width={300} /> <br />
            Id: {Military[index]._id} <br />
            Title: {Military[index].title} <br />
            Category: {Military[index].category} <br />
            Price: {Military[index].price} <br />
          </div>
        )}
        <input
          type="checkbox"
          id="acceptdelete"
          name="acceptdelete"
          checked={checked4}
          onChange={(e) => setChecked4(!checked4)}
        />
        <button onClick={() => getOneByOneProductPrev()}>Prev</button>
        <button onClick={() => getOneByOneProductNext()}>Next</button>
        <button onClick={() => deleteOneProduct(Military[index]._id)}>
          Delete
        </button>
        <div class="footer">
          <p>Footer</p>
        </div>
      </div>
    );
  }
  //UPDATE VIEW
  else if (currState === 2) {
    return (
      <div class="update">
        <div class="header">
          <h1>Saya’s Chemical and Military Surplus Emporium</h1>
          <div class="btn-container">
            <button type="button">Sign Up</button>
            <button type="button">Login</button>
          </div>
        </div>
        <div class="topnav">
          <button type="button" onClick={() => homeTime()} id="checkout">
            Home
          </button>
          <button type="button" onClick={() => chemicalTime()} id="checkout">
            All Chemicals
          </button>
          <button type="button" onClick={() => addChemicalTime()} id="checkout">
            Add Chemical
          </button>
          <button type="button" onClick={() => addTime()} id="checkout">
            Add Product
          </button>
          <button type="button" onClick={() => updateTime()} id="checkout">
            Update Product
          </button>
          <button type="button" onClick={() => deleteTime()} id="checkout">
            Delete Product
          </button>
          <button type="button" onClick={() => infoTime()} id="checkout">
            Info
          </button>
        </div>

        <div class="updateProduct">
          <br></br>
          <div>Search for Product by Id</div>
          <input
            type="text"
            id="message"
            name="message"
            placeholder="id"
            onChange={(e) => getOneProduct(e.target.value)}
          />
          {viewer2 && <div>Product: {showOneItem}</div>}
          <h3>Update a Product by Id :</h3>
          <form action="">
            <label for="_idupdate">Current ID? </label>
            <input
              type="number"
              placeholder="id?"
              name="_idupdate"
              value={updateProduct._id}
              onChange={handleupdateChange}
            />
            <br></br>

            <br></br>
            <label for="priceupdate">New Price? </label>
            <input
              type="number"
              placeholder="price?"
              name="priceupdate"
              value={updateProduct.price}
              onChange={handleupdateChange}
            />
            <br></br>
            <button type="submit" onClick={handleupdateOnSubmit}>
              Submit
            </button>
          </form>
        </div>
        <div class="footer">
          <p>Footer</p>
        </div>
      </div>
    );
  }
  //INFO VIEW
  else if (currState == 4) {
    return (
      <div class="info">
        <div class="header">
          <h1>Saya’s Chemical and Military Surplus Emporium</h1>
          <div class="btn-container">
            <button type="button">Sign Up</button>
            <button type="button">Login</button>
          </div>
        </div>
        <div class="topnav">
          <button type="button" onClick={() => homeTime()} id="checkout">
            Home
          </button>
          <button type="button" onClick={() => allMilitaryTime()} id="checkout">
            Military Store
          </button>
          <button type="button" onClick={() => chemicalTime()} id="checkout">
            Chemical Store
          </button>
          <button type="button" onClick={() => infoTime()} id="checkout">
            Info
          </button>
        </div>
        <div class="infoContent">
          <h1>About Us</h1>
          <div class="row">
            <div class="column">
              <img
                src="http://127.0.0.1:4000/images/militaryLogo.jpg"
                alt="Saya's Military Surplus Logo"
                width="500"
                height="400"
              ></img>
            </div>
            <div class="column">
              <img
                src="http://127.0.0.1:4000/images/chemicalLogo.jpg"
                alt="Saya's Chemical Emporium Logo"
                width="500"
                height="400"
              ></img>
            </div>
          </div>
          <strong>Intoduction:</strong> Originally founded in 1776 under the
          name <em>Saya's Military Surplus</em> (abbreviated "SMS"), SMS
          underwent a massive merger in 2016 with <em>Saya's Chemicals</em>.
          This partnership ushered in an unprecedented era of worldwide military
          and chemical commerce never seen before. What was formerly the largest
          Midwest distributor for Military memorabilia and vehicles, now became
          the largest distributor <strong>worldwide</strong> for all military
          and chemical products. With unmatched selection and world-class
          customer service, Saya's Chemical and Military Surplus Emporium is
          ready to serve your needs.<br></br> <br></br>
          <strong>The Founders:</strong> Tristan Sayasit and Bilal Hodzic
          <br></br>
          <img
            src="http://127.0.0.1:4000/images/4lthefounders.jpg"
            alt="4lthefounders"
            width="300"
          ></img>
          <strong>Emails:</strong> sayasit7@iastate.edu and bhodzic@iastate.edu
          <br></br>
          <strong>Course:</strong> SE/ComS319 Construction of User Interfaces
          <br></br>
          <strong>Date:</strong> Spring 2023, 5/5/2023 <br></br>
          <strong>Professor:</strong> Dr. Abraham N. Aldaco Gastelum <br></br>
          <strong>Professor Email:</strong> aaldaco@iastate.edu <br></br>
        </div>
        <div class="footer">
          <p>Footer</p>
        </div>
      </div>
    );
  }
} // App end
export default App;
