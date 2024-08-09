import mongoose from 'mongoose';

export const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  orderItems: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
  // Add other fields as needed
});

const Order = mongoose.model('Order', orderSchema);
export default Order;