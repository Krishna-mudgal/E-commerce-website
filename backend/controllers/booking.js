const {productModel} = require("../models/product");
const {bookingModel} = require("../models/booking");

const handleCreateBooking = async (req, res) => {
    const {
    productId,
    productTitle,
    productImage,
    productDescription,
    price,
    quantity,
    customerName,
    customerEmail,
    deliveryAddress
  } = req.body;

  if(!productId || !productTitle || !productImage || !productDescription || !price || !quantity || !customerName || !customerEmail || !deliveryAddress) return res.status(400).json({
    message: "All details are required"
  })

  try {
    const product = await productModel.findById(productId);
    if (!product || product.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const booking = await bookingModel.create({
      productId,
      productTitle,
      productImage,
      productDescription,
      price,
      quantity,
      customerName,
      customerEmail,
      deliveryAddress,
    });

    product.quantity -= quantity;
    await product.save();

    res.status(200).json({ message: 'Booking successful', bookingId: booking._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
    handleCreateBooking
}