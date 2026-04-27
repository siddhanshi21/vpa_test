const router = require('express').Router();
const c = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');
router.use(protect, adminOnly);
router.get('/stats', c.stats);
router.get('/audit-logs', c.auditLogs);
router.post('/broadcast', c.broadcast);
module.exports = router;
