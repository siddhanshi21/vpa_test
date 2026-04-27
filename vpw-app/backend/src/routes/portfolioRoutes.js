const router = require('express').Router();
const c = require('../controllers/portfolioController');
const { protect, adminOnly } = require('../middleware/auth');
router.get('/my', protect, c.myPortfolio);
router.put('/manual-update', protect, adminOnly, c.manualUpdate);
module.exports = router;
