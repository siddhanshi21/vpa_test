const User = require('../models/User');
const { syncUserToZohoCrm } = require('../services/zohoCrmService');

module.exports = {
  syncUser: async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const data = await syncUserToZohoCrm(user);
    res.json({ message: 'Synced', data });
  },
  syncAllUsers: async (req, res) => {
    const users = await User.find();
    const results = [];
    for (const user of users) results.push({ user: user.email, result: await syncUserToZohoCrm(user) });
    res.json({ message: 'Sync completed', resultsCount: results.length, results });
  }
};
