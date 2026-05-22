# ASTU Gebeya

Campus marketplace web application — **final group project** for the Web Programming course at Addis Ababa Science and Technology University (ASTU).

Students can browse listings, save favorites, register as buyers or sellers, post items (demo mode), and contact sellers — all powered by **mock data and browser local storage** (no database required for the demo).

## Tech Stack

| Layer                  | Technologies                                                     |
| ---------------------- | ---------------------------------------------------------------- |
| **Frontend**           | Next.js 16, React 19, Tailwind CSS v4, TypeScript                |
| **Backend** (optional) | Express, Prisma, PostgreSQL — not wired to the UI for submission |

## Features

- Home page with search, category sidebar, and trending listings
- Browse page with filters, sort, and URL query support (`/browse?q=phone&category=3`)
- Category pages with product grids
- Product detail with contact seller (WhatsApp/call demo) and share
- Favorites saved in `localStorage`
- Auth (register/login/logout) with demo account
- Sell page — sellers can add listings stored locally
- Profile page with editable info and “My Listings”

## Demo Login

```
Email:    abebe@gmail.com
Password: demo1234
```

## Quick Start

### Frontend (required)

```bash
cd client
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend

```bash
cd server
npm install
# Configure .env with DATABASE_URL
npm run dev
```

## Project Structure

```
astu-gebeya/
├── client/          # Next.js app (submission focus)
│   ├── app/         # Pages (browse, sell, auth, profile, …)
│   ├── components/  # UI & marketplace components
│   └── lib/         # Mock data, auth, products helpers
├── server/          # Express API (future / optional)
└── README.md
```

## Team

ASTU — Web Programming, Group Final Project.

1. Ayana Samuel - ugr/30201/15
2. Ayub Nasir - ugr/30219/15
3. Gemechu Alemu - ugr/30589/15
4. Megersa Tekalign - ugr/31494/15
5. Meklit H/Michael - ugr/30878/15
6. Milion Mengistu - ugr/30932/15
