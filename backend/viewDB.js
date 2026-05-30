require('dotenv').config();
const mongoose = require('mongoose');

const User    = require('./models/User');
const Shop    = require('./models/Shop');
const Product = require('./models/Product');
const Review  = require('./models/Review');
const Video   = require('./models/Video');

async function showDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('\n========================================');
  console.log('       LOCALSPOT DATABASE VIEWER');
  console.log('========================================\n');

  // USERS
  const users = await User.find().select('-password').lean();
  console.log(`👤 USERS (${users.length} total)`);
  console.log('----------------------------------------');
  if (!users.length) {
    console.log('  No users found.\n');
  } else {
    users.forEach(u => {
      console.log(`  Name    : ${u.name}`);
      console.log(`  Email   : ${u.email}`);
      console.log(`  Role    : ${u.role}`);
      console.log(`  Phone   : ${u.phone || '—'}`);
      console.log(`  Joined  : ${new Date(u.createdAt).toLocaleString()}`);
      console.log(`  ID      : ${u._id}`);
      console.log('  ·····');
    });
    console.log();
  }

  // SHOPS
  const shops = await Shop.find().lean();
  console.log(`🏪 SHOPS (${shops.length} total)`);
  console.log('----------------------------------------');
  if (!shops.length) {
    console.log('  No shops found.\n');
  } else {
    shops.forEach(s => {
      console.log(`  Name     : ${s.name}`);
      console.log(`  Category : ${s.category}`);
      console.log(`  Area     : ${s.area}`);
      console.log(`  Phone    : ${s.phone || '—'}`);
      console.log(`  Rating   : ${s.rating} (${s.reviewCount} reviews)`);
      console.log(`  Featured : ${s.featured} | Trending: ${s.trending}`);
      console.log(`  ID       : ${s._id}`);
      console.log('  ·····');
    });
    console.log();
  }

  // PRODUCTS
  const products = await Product.find().lean();
  console.log(`📦 PRODUCTS (${products.length} total)`);
  console.log('----------------------------------------');
  if (!products.length) {
    console.log('  No products found.\n');
  } else {
    products.forEach(p => {
      console.log(`  Name    : ${p.name}`);
      console.log(`  Price   : ₹${p.price || '—'}`);
      console.log(`  InStock : ${p.inStock}`);
      console.log(`  Shop ID : ${p.shop}`);
      console.log('  ·····');
    });
    console.log();
  }

  // REVIEWS
  const reviews = await Review.find().lean();
  console.log(`⭐ REVIEWS (${reviews.length} total)`);
  console.log('----------------------------------------');
  if (!reviews.length) {
    console.log('  No reviews found.\n');
  } else {
    reviews.forEach(r => {
      console.log(`  Rating  : ${r.rating}/5`);
      console.log(`  Comment : ${r.comment || '—'}`);
      console.log(`  Shop ID : ${r.shop}`);
      console.log(`  User ID : ${r.user}`);
      console.log('  ·····');
    });
    console.log();
  }

  // VIDEOS
  const videos = await Video.find().lean();
  console.log(`🎬 VIDEOS (${videos.length} total)`);
  console.log('----------------------------------------');
  if (!videos.length) {
    console.log('  No videos found.\n');
  } else {
    videos.forEach(v => {
      console.log(`  Title   : ${v.title || '—'}`);
      console.log(`  URL     : ${v.url}`);
      console.log(`  Views   : ${v.views}`);
      console.log(`  Shop ID : ${v.shop}`);
      console.log('  ·····');
    });
    console.log();
  }

  console.log('========================================\n');
  await mongoose.disconnect();
}

showDB().catch(console.error);
