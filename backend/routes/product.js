const express = require("express");
const { handleAddProduct, handleGetAllProducts, handleGetProductById } = require("../controllers/product")

const productRouter = express.Router();

productRouter.post("/", handleAddProduct);
productRouter.get("/", handleGetAllProducts);
productRouter.get("/:id", handleGetProductById);


module.exports = {productRouter};
