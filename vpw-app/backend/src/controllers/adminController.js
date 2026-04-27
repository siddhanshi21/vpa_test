const User = require('../models/User');
const Investment = require('../models/Investment');
const KYC = require('../models/KYC');
const Portfolio = require('../models/Portfolio');
const Broadcast = require('../models/Broadcast');
const AuditLog = require('../models/AuditLog');

module.exports = {
  stats: async (req, res) => {
    const [totalUsers, activeSips, pendingOrders, pendingKyc, portfolios] = await Promise.all([
      User.countDocuments(),
      Investment.countDocuments({ type: 'SIP', status: 'approved' }),
      Investment.countDocuments({ status: 'pending' }),
      KYC.countDocuments({ status: 'pending' }),
      Portfolio.find()
    ]);
    const totalAum = portfolios.reduce((s, p) => s + (p.currentValue || 0), 0);
    res.json({ totalUsers, activeSips, pendingOrders, pendingKyc, totalAum, systemStatus: 'Healthy' });
  },
  auditLogs: async (req, res) => res.json(await AuditLog.find().sort({ createdAt: -1 }).limit(100)),
  broadcast: async (req, res) => {
    const entry = await Broadcast.create({ ...req.body, sentBy: req.user._id });
    await AuditLog.create({ adminId: req.user._id, action: 'BROADCAST_SENT', module: 'Broadcast', details: entry.title });
    res.status(201).json(entry);
  }
};
