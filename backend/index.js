const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Military = require("./militarySchema.js");
const Chemical = require("./chemicalSchema.js");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/images", express.static("images"));
mongoose.connect(
  "mongodb+srv://bhodzic:K7yK07OZqhO9fSon@cluster52845.751uhbi.mongodb.net/?retryWrites=true&w=majority",
  {
    dbName: "MilitaryAndChemicalStore",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const port = process.env.PORT || 4000;
const host = "localhost";
app.get("/military", async (req, resp) => {
  const query = {};
  const allProducts = await Military.find(query);
  console.log(allProducts);
  resp.send(allProducts);
});
app.get("/chemical", async (req, resp) => {
  const query = {};
  const allProducts = await Chemical.find(query);
  console.log(allProducts);
  resp.send(allProducts);
});
app.get("/:id/military", async (req, resp) => {
  const id = req.params.id;
  const query = { _id: id };
  const oneProduct = await Military.findOne(query);
  console.log(oneProduct);
  resp.send(oneProduct);
});
app.post("/insert/Military", async (req, res) => {
  console.log(req.body);
  const p_id = req.body._id;
  const ptitle = req.body.title;
  const pprice = req.body.price;
  const pdescription = req.body.description;
  const pcategory = req.body.category;
  const pimage = req.body.image;
  const formData = new Military({
    _id: p_id,
    title: ptitle,
    price: pprice,
    description: pdescription,
    category: pcategory,
    image: pimage,
  });
  try {
    // await formData.save();
    await Military.create(formData);
    const messageResponse = { message: `Military ${p_id} added correctly` };
    res.send(JSON.stringify(messageResponse));
  } catch (err) {
    console.log("Error while adding a new military:" + err);
  }
});
app.delete("/delete/military", async (req, res) => {
  console.log("Delete :", req.body);
  try {
    const query = { _id: req.body._id };
    await Military.deleteOne(query);
    const messageResponse = {
      message: `Military ${req.body._id} deleted correctly`,
    };
    res.send(JSON.stringify(messageResponse));
  } catch (err) {
    console.log("Error while deleting :" + p_id + " " + err);
  }
});
app.put("/Update/military", async (req, res) => {
  console.log("Update :", req.body);
  const p_id = req.body._id;
  const pprice = req.body.price;

  try {
    const query = { _id: p_id };
    const toUpdate = await Military.findOne(query);
    if (pprice !== -1) {
      toUpdate.price = pprice;
    }
    toUpdate.save();
    const messageResponse = {
      message: `Military ${req.body._id} updated correctly`,
    };
    res.send(JSON.stringify(messageResponse));
  } catch (err) {
    console.log("Error while updating :" + p_id + " " + err);
  }
});
app.listen(port, () => {
  console.log(`App listening at http://%s:%s`, host, port);
});
