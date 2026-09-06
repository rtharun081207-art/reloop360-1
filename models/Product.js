const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    icon: { type: String, default: '📦' },
    name: { type: String, required: [true, 'Item name is required'], trim: true },
    description: { type: String, default: '' },
    cat: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Books', 'Clothes', 'E-Waste', 'Furniture'],
    },
    price: { type: Number, default: 0, min: 0 },
    cond: {
      type: String,
      enum: ['New', 'Good', 'Used', 'Working', 'For Recycling'],
      default: 'Good',
    },
    loc: { type: String, required: [true, 'Location is required'] },
    seller: { type: String, required: [true, 'Seller name is required'] },
    verified: { type: Boolean, default: false },
    exchange: { type: Boolean, default: false },
    listingType: { type: String, enum: ['sell', 'want'], default: 'sell' },
    isMatched: { type: Boolean, default: false },
    status: { type: String, enum: ['available', 'requested', 'sold'], default: 'available' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);