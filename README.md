# LocalSpot 🗺️

**Discover Famous Local Shops Near You**

LocalSpot is a hyperlocal shop discovery platform where users can explore curated local shops, view product photos, watch promo videos, and connect instantly via WhatsApp or navigation.

---

## Features

- Browse shops by category and neighbourhood
- Shop profiles with products, videos, and reviews
- Creator dashboard for promo video uploads
- Shop owner dashboard to manage listings
- Admin panel for platform management
- JWT-based authentication

---

## Tech Stack

| Layer    | Tech                        |
|----------|-----------------------------|
| Frontend | HTML, CSS, JavaScript       |
| Backend  | Node.js, Express.js         |
| Database | MongoDB Atlas (Mongoose)    |
| Auth     | JWT + bcryptjs              |

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### Setup

```bash
# Clone the repo
git clone https://github.com/your-username/localspot.git
cd localspot

# Install backend dependencies
cd backend
npm install

# Create your .env file
cp .env.example .env
# Fill in your values in .env

# Start the backend
npm run dev
```

Then open `index.html` in your browser (or use Live Server).

---

## Environment Variables

See `backend/.env.example` for all required variables.

| Variable          | Description                        |
|-------------------|------------------------------------|
| `PORT`            | Backend server port (default 5000) |
| `MONGO_URI`       | MongoDB Atlas connection string    |
| `JWT_SECRET`      | Secret key for JWT signing         |
| `JWT_EXPIRE`      | JWT token expiry (e.g. 30d)        |
| `FRONTEND_URL`    | Allowed CORS origin                |
| `NODE_ENV`        | `development` or `production`      |

---

## Project Structure

```
localspot/
├── backend/          # Express API
│   ├── config/       # DB connection
│   ├── controllers/  # Route handlers
│   ├── middleware/   # Auth middleware
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   └── server.js
├── css/              # Stylesheets
├── js/               # Frontend scripts
├── *.html            # Frontend pages
└── README.md
```

---

## License

MIT
