const Fund = require('../models/Fund');

module.exports = {
  getFunds: async (req, res) => {
    const { search, category, riskLevel, assetClass } = req.query;
    const query = {};
    if (search) query.name = new RegExp(search, 'i');
    if (category) query.category = category;
    if (riskLevel) query.riskLevel = riskLevel;
    if (assetClass) query.assetClass = assetClass;
    res.json(await Fund.find(query));
  },
  createFund: async (req, res) => res.status(201).json(await Fund.create(req.body)),
  getFund: async (req, res) => res.json(await Fund.findById(req.params.id)),
  updateFund: async (req, res) => res.json(await Fund.findByIdAndUpdate(req.params.id, req.body, { new: true })),
  deleteFund: async (req, res) => { await Fund.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
};
