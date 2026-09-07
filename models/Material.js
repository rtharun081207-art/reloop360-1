const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema(
  {
    icon: { type: String, default: '🏭' },
    name: { type: String, required: [true, 'Material name is required'], trim: true },
    description: { type: String, default: '' },
    qty: { type: String, default: '' }, // e.g. "120 kg", "40 bales"
    cond: {
      type: String,
      enum: ['New', 'Reusable', 'For Recycling', 'Working'],
      default: 'Reusable',
    },
    loc: { type: String, required: [true, 'Location is required'] },
    seller: { type: String, required: [true, 'Company name is required'] },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    verified: { type: Boolean, default: false },
    listingType: { type: String, enum: ['sell', 'want'], default: 'sell' },
    isMatched: { type: Boolean, default: false },
    status: { type: String, enum: ['available', 'requested', 'sold'], default: 'available' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Material', materialSchema);