const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  targetAmount: Number,
  currentAmount: Number,
  deadline: Date,
  category: String
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);
