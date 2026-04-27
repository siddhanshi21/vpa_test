const mongoose = require('mongoose');

const fundSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  assetClass: String,
  nav: Number,
  returns1Y: Number,
  returns3Y: Number,
  riskLevel: { type: String, enum: ['Low', 'Moderate', 'High'] },
  description: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Fund', fundSchema);
