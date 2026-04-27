const Portfolio = require('../models/Portfolio');

module.exports = {
  myPortfolio: async (req, res) => res.json(await Portfolio.findOne({ userId: req.user._id }).populate('holdings.fundId')),
  manualUpdate: async (req, res) => {
    const { userId, ...data } = req.body;
    const portfolio = await Portfolio.findOneAndUpdate({ userId }, data, { new: true, upsert: true });
    res.json(portfolio);
  }
};
