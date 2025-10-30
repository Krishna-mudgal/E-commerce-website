const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productTitle: String,
  productImage: String,
  productDescription: String,
  price: Number,
  quantity: Number,
  customerName: String,
  customerEmail: String,
  deliveryAddress: String,
  orderDate: { type: Date, default: Date.now },
});

const bookingModel = mongoose.model("Booking", bookingSchema);

module.exports = {
    bookingModel
}