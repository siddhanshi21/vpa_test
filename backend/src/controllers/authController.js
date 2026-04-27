const bcrypt = require('bcrypt');
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');
const generateToken = require('../utils/generateToken');
const { syncUserToZohoCrm } = require('../services/zohoCrmService');

const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phone, password: hash });
    await Portfolio.create({ userId: user._id });
    syncUserToZohoCrm(user).catch(() => {});
    res.status(201).json({ token: generateToken(user._id, user.role), user: { ...user.toObject(), password: undefined } });
  } catch (e) { next(e); }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ token: generateToken(user._id, user.role), user: { ...user.toObject(), password: undefined } });
  } catch (e) { next(e); }
};

const me = async (req, res) => res.json(req.user);

module.exports = { register, login, me };
