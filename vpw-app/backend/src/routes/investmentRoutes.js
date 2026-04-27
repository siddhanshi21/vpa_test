const router = require('express').Router();
const c = require('../controllers/investmentController');
const { protect, adminOnly } = require('../middleware/auth');
router.post('/', protect, c.createInvestment);
router.get('/my', protect, c.myInvestments);
router.get('/admin', protect, adminOnly, c.adminInvestments);
router.patch('/:id/status', protect, adminOnly, c.updateStatus);
module.exports = router;
