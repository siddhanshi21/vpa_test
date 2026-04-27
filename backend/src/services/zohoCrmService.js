const axios = require('axios');

const getAccessToken = async () => {
  const response = await axios.post('https://accounts.zoho.in/oauth/v2/token', null, {
    params: {
      refresh_token: process.env.ZOHO_REFRESH_TOKEN,
      client_id: process.env.ZOHO_CLIENT_ID,
      client_secret: process.env.ZOHO_CLIENT_SECRET,
      grant_type: 'refresh_token'
    }
  });
  return response.data.access_token;
};

const syncUserToZohoCrm = async (user) => {
  try {
    const token = await getAccessToken();
    const moduleName = process.env.ZOHO_CRM_MODULE || 'Leads';
    const payload = {
      data: [{
        Last_Name: user.name,
        Email: user.email,
        Phone: user.phone,
        PAN_Number: user.panNumber,
        CAN_Number: user.canNumber,
        KYC_Status: user.kycStatus,
        Investor_Status: user.status,
        Total_Investment: user.totalInvestment || 0
      }],
      duplicate_check_fields: ['Email']
    };

    const url = `${process.env.ZOHO_CRM_API_DOMAIN || 'https://www.zohoapis.in'}/crm/v2/${moduleName}/upsert`;
    const { data } = await axios.post(url, payload, {
      headers: { Authorization: `Zoho-oauthtoken ${token}` }
    });
    return data;
  } catch (error) {
    console.error('Zoho CRM sync failed:', error.response?.data || error.message);
    return { error: true, message: 'Zoho CRM sync failed' };
  }
};

module.exports = { syncUserToZohoCrm };
