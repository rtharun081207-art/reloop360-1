const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    buyerName: { type: String, required: true },
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sellerName: { type: String, required: true },
    mode: { type: String, enum: ['buy', 'donate', 'exchange'], default: 'buy' },
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'completed'], default: 'pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);