const SupportTicket = require('../models/SupportTicket');
const { createZohoDeskTicket } = require('../services/zohoDeskService');

module.exports = {
  createTicket: async (req, res) => {
    const zoho = await createZohoDeskTicket({ ...req.body, email: req.user.email, phone: req.user.phone });
    const ticket = await SupportTicket.create({ ...req.body, userId: req.user._id, zohoTicketId: zoho.id, status: 'open' });
    res.status(201).json(ticket);
  },
  getTickets: async (req, res) => {
    const query = req.user.role === 'admin' ? {} : { userId: req.user._id };
    res.json(await SupportTicket.find(query));
  },
  getTicket: async (req, res) => res.json(await SupportTicket.findById(req.params.id))
};
