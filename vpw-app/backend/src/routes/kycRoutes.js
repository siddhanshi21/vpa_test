const router = require('express').Router();
const multer = require('multer');
const { submitKyc, pendingKyc, approveKyc, rejectKyc } = require('../controllers/kycController');
const { protect, adminOnly } = require('../middleware/auth');

const upload = multer({ dest: 'src/uploads/' });
const kycUpload = upload.fields([
  { name: 'panDoc', maxCount: 1 },
  { name: 'aadhaarDoc', maxCount: 1 },
  { name: 'photo', maxCount: 1 },
  { name: 'signature', maxCount: 1 }
]);

router.post('/', protect, kycUpload, submitKyc);
router.get('/pending', protect, adminOnly, pendingKyc);
router.patch('/:id/approve', protect, adminOnly, approveKyc);
router.patch('/:id/reject', protect, adminOnly, rejectKyc);

module.exports = router;
