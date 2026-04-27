# VPW / Victoria Paradise Wealth

A full-stack mutual fund investment and financial planning platform with user and admin modules.

## Project Structure

```
vpw-app/
  frontend/
  backend/
```

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Optional seed data:

```bash
npm run seed
```

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

Backend (`backend/.env`):
- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CLIENT_URL`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN`
- `ZOHO_CRM_API_DOMAIN`, `ZOHO_CRM_MODULE`
- `ZOHO_DESK_ORG_ID`, `ZOHO_DESK_DEPARTMENT_ID`, `ZOHO_DESK_API_DOMAIN`

Frontend (`frontend/.env`):
- `VITE_API_URL`

## Demo Credentials

- Admin: `admin@vpw.com` / `admin123`
- User: `user@vpw.com` / `user123`

## Zoho CRM Setup Notes

1. Create a Zoho OAuth self-client and generate refresh token.
2. Set CRM vars in `.env`.
3. Use APIs:
   - `POST /api/integrations/zoho/crm/sync-user/:id`
   - `POST /api/integrations/zoho/crm/sync-all-users`

## Zoho Desk Setup Notes

1. Configure Desk org ID and department ID.
2. Ensure OAuth refresh flow is enabled in env.
3. Use APIs:
   - `POST /api/support/tickets`
   - `GET /api/support/tickets`
   - `GET /api/support/tickets/:id`

## Feature Coverage

- JWT auth + role-based admin/user route protection
- KYC upload and approval/rejection workflow
- Fund discovery, SIP/lumpsum ordering
- Portfolio, goals, profile, support ticketing
- Admin control center (users, funds, KYC, orders, broadcast, reports, system)
- Printable forms management page
- Zoho CRM and Zoho Desk integration services/routes
