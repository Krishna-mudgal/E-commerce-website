const { productModel } = require("../models/product");

const handleAddProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      imageUrl,
      price,
      quantity,
      sellerName,
      sellerPhone,
      sellerEmail,
      discountPercent,
    } = req.body;

    if (
      !title ||
      !imageUrl ||
      !price ||
      !quantity ||
      !sellerName ||
      !sellerPhone ||
      !sellerEmail
    ) {
      return res.status(400).json({
        message: "All details are required!",
      });
    }

    const product = await productModel.create({
      title: title.trim(),
      description: description?.trim() || "",
      imageUrl: imageUrl.trim(),
      price,
      quantity,
      sellerName: sellerName.trim(),
      sellerPhone: sellerPhone.trim(),
      sellerEmail: sellerEmail.trim(),
      discountPercent: discountPercent || 0,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

const handleGetAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({});

    if (!products) {
      return res.status(404).json({
        message: "No data is found",
      });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error getting experience:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleGetProductById = async (req, res) => {
  try {
    const {id} = req.params.id;
    if (!id)
      return res.status(400).json({
        message: "Something went wrong",
      });

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "something went wrong",
      });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

module.exports = {
  handleAddProduct,
  handleGetAllProducts,
  handleGetProductById,
};
