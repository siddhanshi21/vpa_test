const User = require('../models/User');

const getUsers = async (req, res) => {
  const q = req.query.q;
  const query = q ? { $or: [{ name: new RegExp(q, 'i') }, { email: new RegExp(q, 'i') }, { canNumber: new RegExp(q, 'i') }] } : {};
  const users = await User.find(query).select('-password');
  res.json(users);
};
const getUser = async (req, res) => res.json(await User.findById(req.params.id).select('-password'));
const updateUser = async (req, res) => res.json(await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password'));
const updateUserStatus = async (req, res) => res.json(await User.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).select('-password'));

module.exports = { getUsers, getUser, updateUser, updateUserStatus };
