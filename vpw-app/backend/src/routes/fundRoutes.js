const router = require('express').Router();
const c = require('../controllers/fundController');
const { protect, adminOnly } = require('../middleware/auth');
router.get('/', c.getFunds);
router.get('/:id', c.getFund);
router.post('/', protect, adminOnly, c.createFund);
router.put('/:id', protect, adminOnly, c.updateFund);
router.delete('/:id', protect, adminOnly, c.deleteFund);
module.exports = router;
