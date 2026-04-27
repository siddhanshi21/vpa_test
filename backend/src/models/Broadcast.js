const mongoose = require('mongoose');

const broadcastSchema = new mongoose.Schema({
  title: String,
  message: String,
  recipients: [String],
  sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Broadcast', broadcastSchema);
