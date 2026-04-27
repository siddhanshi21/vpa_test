const router = require('express').Router();
const c = require('../controllers/supportController');
const { protect } = require('../middleware/auth');
router.use(protect);
router.post('/tickets', c.createTicket);
router.get('/tickets', c.getTickets);
router.get('/tickets/:id', c.getTicket);
module.exports = router;
