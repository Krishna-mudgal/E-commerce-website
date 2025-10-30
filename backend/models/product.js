const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 2000,
    default: "",
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0.01,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  sellerName: {
    type: String,
    required: true,
    default: ""
  },
  sellerPhone: {
    type: String,
    required: true,
  },
  sellerEmail: {
    type: String,
    required: true,
  },
  discountPercent: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

productModel = mongoose.model("Product", productSchema);

module.exports = {productModel};