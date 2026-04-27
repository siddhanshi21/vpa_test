const router = require('express').Router();
const { getUsers, getUser, updateUser, updateUserStatus } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/auth');
router.use(protect, adminOnly);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.patch('/:id/status', updateUserStatus);
module.exports = router;
