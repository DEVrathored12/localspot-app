const express = require('express');
const dotenv  = require('dotenv');
const path    = require('path');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// CORS — allow any localhost port + production
app.use((req, res, next) => {
  const origin = req.headers.origin || '';
  const allowed = !origin ||
    /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) ||
    origin === 'https://localspot-app.vercel.app';
  if (allowed) {
    res.header('Access-Control-Allow-Origin',      origin || '*');
    res.header('Access-Control-Allow-Methods',     'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers',     'Content-Type,Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.use('/api/auth',                   require('./routes/auth'));
app.use('/api/shops',                  require('./routes/shops'));
app.use('/api/shops/:shopId/products', require('./routes/products'));
app.use('/api/shops/:shopId/videos',   require('./routes/videos'));
app.use('/api/shops/:shopId/reviews',  require('./routes/reviews'));
app.use('/api/products',               require('./routes/products'));
app.use('/api/videos',                 require('./routes/videos'));
app.use('/api/reviews',                require('./routes/reviews'));
app.use('/api/creators',               require('./routes/creators'));
app.use('/api/admin',                  require('./routes/admin'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ LocalSpot API running on port ${PORT}`));

module.exports = app;
