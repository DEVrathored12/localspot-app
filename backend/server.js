const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();
connectDB().catch(err => { console.error('❌ DB connection failed:', err.message); process.exit(1); });

const app = express();

app.use(cors({
  origin: (origin, cb) => {
    // Allow any localhost/127.0.0.1 port + production
    if (!origin || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) || origin === 'https://localspot-app.vercel.app') {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'LocalSpot API is running', timestamp: new Date().toISOString() });
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth',                        require('./routes/auth'));
app.use('/api/shops',                       require('./routes/shops'));
app.use('/api/shops/:shopId/products',      require('./routes/products'));
app.use('/api/shops/:shopId/videos',        require('./routes/videos'));
app.use('/api/shops/:shopId/reviews',       require('./routes/reviews'));
app.use('/api/products',                    require('./routes/products'));
app.use('/api/videos',                      require('./routes/videos'));
app.use('/api/reviews',                     require('./routes/reviews'));
app.use('/api/creators',                    require('./routes/creators'));
app.use('/api/admin',                       require('./routes/admin'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ LocalSpot API running on http://localhost:${PORT}`));

module.exports = app;
