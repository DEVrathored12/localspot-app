const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
  name:     String,
  email:    String,
  phone:    String,
  password: String,
  role:     String,
  avatar:   { type: String, default: '' }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  const hashed = await bcrypt.hash('admin123', 10);
  await User.deleteOne({ email: 'admin@localspot.com' });
  await User.create({ name: 'Admin', email: 'admin@localspot.com', phone: '0000000000', password: hashed, role: 'admin' });
  console.log('✅ Admin created:\n   Email   : admin@localspot.com\n   Password: admin123');
  await mongoose.disconnect();
}

seed();
