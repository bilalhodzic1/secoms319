const mongoose = require("mongoose");
const ReactFormDataSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    title: { type: String },
    price: { type: Number },
    description: { type: String },
    category: { type: String },
    image: { type: String },
  },
  { collection: "military_supplies" }
);
const Military = mongoose.model("Military", ReactFormDataSchema);
module.exports = Military;
