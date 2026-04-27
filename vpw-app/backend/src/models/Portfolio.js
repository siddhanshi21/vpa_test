const mongoose = require('mongoose');

const holdingSchema = new mongoose.Schema({
  fundId: { type: mongoose.Schema.Types.ObjectId, ref: 'Fund' },
  units: Number,
  investedAmount: Number,
  currentValue: Number
}, { _id: false });

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  totalInvested: { type: Number, default: 0 },
  currentValue: { type: Number, default: 0 },
  totalReturns: { type: Number, default: 0 },
  holdings: [holdingSchema]
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
