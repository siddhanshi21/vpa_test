const Investment = require('../models/Investment');

module.exports = {
  createInvestment: async (req, res) => {
    const investment = await Investment.create({ ...req.body, userId: req.user._id, orderId: `ORD-${Date.now()}` });
    res.status(201).json(investment);
  },
  myInvestments: async (req, res) => res.json(await Investment.find({ userId: req.user._id }).populate('fundId')),
  adminInvestments: async (req, res) => res.json(await Investment.find().populate('fundId userId', 'name email')),
  updateStatus: async (req, res) => res.json(await Investment.findByIdAndUpdate(req.params.id, req.body, { new: true }))
};
