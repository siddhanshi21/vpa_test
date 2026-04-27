const router = require('express').Router();
const c = require('../controllers/goalController');
const { protect } = require('../middleware/auth');
router.use(protect);
router.get('/', c.getGoals);
router.post('/', c.createGoal);
router.put('/:id', c.updateGoal);
router.delete('/:id', c.deleteGoal);
module.exports = router;
