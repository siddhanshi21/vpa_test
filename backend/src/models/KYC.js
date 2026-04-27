const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  panNumber: String,
  aadhaarNumber: String,
  documents: {
    panDoc: String,
    aadhaarDoc: String,
    photo: String,
    signature: String
  },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminRemarks: String
}, { timestamps: true });

module.exports = mongoose.model('KYC', kycSchema);
