import logo from "./logo.svg";
import "./App.css";

import { useState, useEffect } from "react";
function App() {
  const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);
  const [oneProduct, setOneProduct] = useState([]);
  const [viewer2, setViewer2] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);
  const [currState, setCurrState] = useState(0);
  const [listItems, setListItems] = useState();

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
  useEffect(() => {
    getAllProducts();
  }, []);
  useEffect(() => {
    getAllProducts();
  }, [checked4]);
  const [addNewProduct, setAddNewProduct] = useState({
    _id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://127.0.0.1:4000/images/",
    rating: { rate: 0.0, count: 0 },
  });
  const [updateProduct, setupdateProduct] = useState({
    _id: 0,
    title: "notitle",
    price: -1,
    description: "nodesc",
    category: "nocat",
    image: "http://127.0.0.1:4000/images/",
    rating: { rate: -1, count: -1 },
  });

  const showAllItems = product.map((el) => (
    <div key={el._id} class="item">
      <img src={el.image} width={300} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rate: {el.rating.rate} and Count: {el.rating.count}
      <br />
    </div>
  ));
  function getAllProducts() {
    fetch("http://localhost:4000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
    setListItems();
  }
  function getOneProduct(id) {
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://localhost:4000/" + id)
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
  const showOneItem = oneProduct.map((el) => (
    <div key={el._id}>
      <img src={el.image} width={300} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rate :{el.rating.rate} and Count:{el.rating.count} <br />
    </div>
  ));
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
    } else if (evt.target.name === "rate") {
      setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
    } else if (evt.target.name === "count") {
      const temp = addNewProduct.rating.rate;
      setAddNewProduct({
        ...addNewProduct,
        rating: { rate: temp, count: value },
      });
    }
  }
  function handleupdateChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_idupdate") {
      setupdateProduct({ ...updateProduct, _id: value });
    } else if (evt.target.name === "titleupdate") {
      setupdateProduct({ ...updateProduct, title: value });
    } else if (evt.target.name === "priceupdate") {
      setupdateProduct({ ...updateProduct, price: value });
    } else if (evt.target.name === "descriptionupdate") {
      setupdateProduct({ ...updateProduct, description: value });
    } else if (evt.target.name === "categoryupdate") {
      setupdateProduct({ ...updateProduct, category: value });
    } else if (evt.target.name === "imageupdate") {
      const temp = value;
      setupdateProduct({ ...updateProduct, image: temp });
    } else if (evt.target.name === "rateupdate") {
      setupdateProduct({ ...updateProduct, rating: { rate: value } });
    } else if (evt.target.name === "countupdate") {
      const temp = updateProduct.rating.rate;
      setupdateProduct({
        ...updateProduct,
        rating: { rate: temp, count: value },
      });
    }
  }
  function handleupdateOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/Update", {
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
    getAllProducts();
  }
  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewProduct),
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
  }
  function getOneByOneProductNext() {
    if (product.length > 0) {
      if (index === product.length - 1) setIndex(0);
      else setIndex(index + 1);
      if (product.length > 0) setChecked4(true);
      else setChecked4(false);
    }
  }
  function getOneByOneProductPrev() {
    if (product.length > 0) {
      if (index === 0) setIndex(product.length - 1);
      else setIndex(index - 1);
      if (product.length > 0) setChecked4(true);
      else setChecked4(false);
    }
  }
  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:4000/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: deleteid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete a product completed : ", deleteid);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
    setChecked4(!checked4);
  }
  if (currState === 0) {
    return (
      <div class="index">
        <div class="topnavHome">
          <button
            type="button"
            onClick={() => {
              addTime();
            }}
            id="checkout"
          >
            Create Product
          </button>
          <button
            type="button"
            onClick={() => {
              readTime();
              getAllProducts();
            }}
            id="checkout"
          >
            Read Products
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
        <div class="header">
          <h1>Saya's Shoe Catalog </h1>
          <button onClick={() => getAllProducts()}>Show all Products</button>
          <h1>Show all Available Products:</h1>
        </div>
        {<div class="products">{showAllItems}</div>}
      </div>
    );
  } else if (currState === 1) {
    return (
      <div class="addProduct">
        <div class="topnav">
          <button type="button" onClick={() => addTime()} id="checkout">
            Create Product
          </button>
          <button type="button" onClick={() => readTime()} id="checkout">
            Read Products
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
        <h3>Add a new Product :</h3>
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
          <label for="rate">Rating? </label>
          <input
            type="number"
            placeholder="rate?"
            name="rate"
            value={addNewProduct.rating.rate}
            onChange={handleChange}
          />
          <br></br>
          <label for="count">Count? </label>
          <input
            type="number"
            placeholder="count?"
            name="count"
            value={addNewProduct.rating.count}
            onChange={handleChange}
          />
          <br></br>
          <button type="submit" onClick={handleOnSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  } else if (currState === 3) {
    return (
      <div class="delete">
        <div class="topnav">
          <button type="button" onClick={() => addTime()} id="checkout">
            Create Product
          </button>
          <button type="button" onClick={() => readTime()} id="checkout">
            Read Products
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
          <div key={product[index]._id} class="deleteProduct">
            <img src={product[index].image} width={300} /> <br />
            Id: {product[index]._id} <br />
            Title: {product[index].title} <br />
            Category: {product[index].category} <br />
            Price: {product[index].price} <br />
            Rate: {product[index].rating.rate} and Count:{" "}
            {product[index].rating.count} <br />
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
        <button onClick={() => deleteOneProduct(product[index]._id)}>
          Delete
        </button>
      </div>
    );
  } else if (currState === 2) {
    return (
      <div class="update">
        <div class="topnav">
          <button type="button" onClick={() => addTime()} id="checkout">
            Create Product
          </button>
          <button type="button" onClick={() => readTime()} id="checkout">
            Read Products
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
      </div>
    );
  } else if (currState == 4) {
    return (
      <div class="info">
        <div class="topnav">
          <button type="button" onClick={() => addTime()} id="checkout">
            Create Product
          </button>
          <button type="button" onClick={() => readTime()} id="checkout">
            Read Products
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
        <strong>Names:</strong> Tristan Sayasit and Bilal Hodzic <br></br>
        <strong>Emails:</strong> sayasit7@iastate.edu and bhodzic@iastate.edu
        <br></br>
        <strong>Course:</strong> COM S 319 <br></br>
        <strong>Date:</strong> 5/1/2023 <br></br>
        <strong>Professor:</strong> Professor Aldaco <br></br>
        <strong>Intoduction:</strong> Welcome to Saya's Shoe Catalog! Our newly
        launched website is our newest method of selling our products. The
        website contains intuitive features for sellers to list new products
        that they wish to sell!
      </div>
    );
  }
} // App end
export default App;
