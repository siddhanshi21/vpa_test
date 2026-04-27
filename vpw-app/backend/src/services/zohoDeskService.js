const axios = require('axios');

const createZohoDeskTicket = async ({ subject, description, priority, category, email, phone }) => {
  try {
    if (!process.env.ZOHO_REFRESH_TOKEN || !process.env.ZOHO_CLIENT_ID || !process.env.ZOHO_CLIENT_SECRET) {
      return { id: 'local-placeholder', status: 'skipped' };
    }

    const tokenRes = await axios.post('https://accounts.zoho.in/oauth/v2/token', null, {
      params: {
        refresh_token: process.env.ZOHO_REFRESH_TOKEN,
        client_id: process.env.ZOHO_CLIENT_ID,
        client_secret: process.env.ZOHO_CLIENT_SECRET,
        grant_type: 'refresh_token'
      }
    });

    const accessToken = tokenRes.data.access_token;
    const domain = process.env.ZOHO_DESK_API_DOMAIN || 'https://desk.zoho.in';

    const { data } = await axios.post(`${domain}/api/v1/tickets`, {
      departmentId: process.env.ZOHO_DESK_DEPARTMENT_ID,
      subject,
      description,
      priority,
      category,
      email,
      phone
    }, {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        orgId: process.env.ZOHO_DESK_ORG_ID
      }
    });

    return data;
  } catch (error) {
    console.error('Zoho Desk ticket create failed:', error.response?.data || error.message);
    return { id: 'local-fallback', status: 'failed_remote' };
  }
};

module.exports = { createZohoDeskTicket };
