const router = require('express').Router();
const c = require('../controllers/integrationController');
const { protect, adminOnly } = require('../middleware/auth');
router.use(protect, adminOnly);
router.post('/zoho/crm/sync-user/:id', c.syncUser);
router.post('/zoho/crm/sync-all-users', c.syncAllUsers);
module.exports = router;
