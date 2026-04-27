const KYC = require('../models/KYC');
const User = require('../models/User');
const { syncUserToZohoCrm } = require('../services/zohoCrmService');

const submitKyc = async (req, res) => {
  const files = req.files || {};
  const documents = {
    panDoc: files.panDoc?.[0]?.path,
    aadhaarDoc: files.aadhaarDoc?.[0]?.path,
    photo: files.photo?.[0]?.path,
    signature: files.signature?.[0]?.path
  };
  const existing = await KYC.findOne({ userId: req.user._id });
  const payload = { ...req.body, userId: req.user._id, documents, status: 'pending' };
  const kyc = existing
    ? await KYC.findByIdAndUpdate(existing._id, payload, { new: true })
    : await KYC.create(payload);
  await User.findByIdAndUpdate(req.user._id, { kycStatus: 'pending', panNumber: req.body.panNumber, aadhaarNumber: req.body.aadhaarNumber, address: req.body.address });
  res.status(201).json(kyc);
};

const pendingKyc = async (req, res) => res.json(await KYC.find({ status: 'pending' }).populate('userId', 'name email'));

const approveKyc = async (req, res) => {
  const kyc = await KYC.findByIdAndUpdate(req.params.id, { status: 'approved', adminRemarks: req.body.adminRemarks }, { new: true });
  const user = await User.findByIdAndUpdate(kyc.userId, { kycStatus: 'approved' }, { new: true });
  syncUserToZohoCrm(user).catch(() => {});
  res.json(kyc);
};

const rejectKyc = async (req, res) => {
  const kyc = await KYC.findByIdAndUpdate(req.params.id, { status: 'rejected', adminRemarks: req.body.adminRemarks }, { new: true });
  await User.findByIdAndUpdate(kyc.userId, { kycStatus: 'rejected' });
  res.json(kyc);
};

module.exports = { submitKyc, pendingKyc, approveKyc, rejectKyc };
