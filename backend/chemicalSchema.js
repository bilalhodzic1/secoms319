const mongoose = require("mongoose");
const ReactFormDataSchema2 = new mongoose.Schema(
  {
    _id: { type: Number },
    title: { type: String },
    price: { type: Number },
    description: { type: String },
    category: { type: String },
    image: { type: String },
  },
  { collection: "chemicals" }
);
const Chemical = mongoose.model("Chemical", ReactFormDataSchema2);
module.exports = Chemical;
