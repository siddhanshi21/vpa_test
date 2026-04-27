const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  investmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Investment' },
  amount: Number,
  type: String,
  status: String,
  paymentRef: String
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
