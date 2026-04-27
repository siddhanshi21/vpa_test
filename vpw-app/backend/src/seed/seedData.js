require('dotenv').config();
const bcrypt = require('bcrypt');
const connectDB = require('../config/db');
const User = require('../models/User');
const Fund = require('../models/Fund');

const seed = async () => {
  await connectDB();
  await User.deleteMany({});
  await Fund.deleteMany({});

  const adminPass = await bcrypt.hash('admin123', 10);
  const userPass = await bcrypt.hash('user123', 10);

  await User.create([
    { name: 'VPW Admin', email: 'admin@vpw.com', password: adminPass, role: 'admin', kycStatus: 'approved' },
    { name: 'Demo User', email: 'user@vpw.com', password: userPass, role: 'user', kycStatus: 'pending' }
  ]);

  await Fund.create([
    { name: 'Axis Small Cap Fund', category: 'Small Cap', assetClass: 'Equity', nav: 55.4, returns1Y: 16.2, returns3Y: 19.3, riskLevel: 'High', description: 'Small cap growth fund.' },
    { name: 'ICICI Prudential Bluechip', category: 'Large Cap', assetClass: 'Equity', nav: 72.9, returns1Y: 12.8, returns3Y: 14.1, riskLevel: 'Moderate', description: 'Bluechip stability fund.' },
    { name: 'Quant ELSS Tax Saver', category: 'ELSS Tax Saver', assetClass: 'Equity', nav: 88.1, returns1Y: 18.7, returns3Y: 21.5, riskLevel: 'High', description: 'Tax saving with growth.' },
    { name: 'SBI Liquid Direct Plan', category: 'Liquid', assetClass: 'Debt', nav: 33.1, returns1Y: 6.3, returns3Y: 6.7, riskLevel: 'Low', description: 'Low-risk liquidity fund.' },
    { name: 'Global Tech Discovery Fund', category: 'High Return', assetClass: 'International Equity', nav: 103.6, returns1Y: 22.4, returns3Y: 25.9, riskLevel: 'High', description: 'Global technology thematic fund.' }
  ]);

  console.log('Seed complete');
  process.exit(0);
};

seed();
