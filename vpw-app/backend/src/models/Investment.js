const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fundId: { type: mongoose.Schema.Types.ObjectId, ref: 'Fund', required: true },
  type: { type: String, enum: ['SIP', 'LUMPSUM'], required: true },
  amount: Number,
  frequency: String,
  startDate: Date,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  orderId: String
}, { timestamps: true });

module.exports = mongoose.model('Investment', investmentSchema);
