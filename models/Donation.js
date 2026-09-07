const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    icon: { type: String, default: '💚' },
    itemName: { type: String, required: [true, 'Item name is required'], trim: true },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Clothes', 'Books', 'E-Materials', 'Food', 'Other'],
    },
    description: { type: String, default: '' },
    donorName: { type: String, required: true },
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ngoName: { type: String, required: [true, 'NGO or drive name is required'] },
    loc: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'accepted', 'collected'], default: 'pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Donation', donationSchema);