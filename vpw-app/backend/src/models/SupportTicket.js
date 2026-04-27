const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subject: String,
  description: String,
  priority: String,
  category: String,
  zohoTicketId: String,
  status: { type: String, default: 'open' }
}, { timestamps: true });

module.exports = mongoose.model('SupportTicket', supportTicketSchema);
