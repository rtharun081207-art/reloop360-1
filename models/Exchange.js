const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema(
  {
    fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fromName: { type: String, required: true },
    message: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

const exchangeSchema = new mongoose.Schema(
  {
    icon: { type: String, default: '🔄' },
    offerItem: { type: String, required: [true, 'What you are offering is required'], trim: true },
    wantItem: { type: String, required: [true, 'What you want in return is required'], trim: true },
    ownerName: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    loc: { type: String, default: '' },
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
    proposals: [proposalSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Exchange', exchangeSchema);