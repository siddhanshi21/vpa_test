const Goal = require('../models/Goal');

module.exports = {
  getGoals: async (req, res) => res.json(await Goal.find({ userId: req.user._id })),
  createGoal: async (req, res) => res.status(201).json(await Goal.create({ ...req.body, userId: req.user._id })),
  updateGoal: async (req, res) => res.json(await Goal.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, { new: true })),
  deleteGoal: async (req, res) => { await Goal.findOneAndDelete({ _id: req.params.id, userId: req.user._id }); res.json({ message: 'Deleted' }); }
};
