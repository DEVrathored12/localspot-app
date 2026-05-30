const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  phone:    { type: String },
  password: { type: String, required: true, minlength: 6, select: false },
  role:     { type: String, enum: ['customer', 'shop', 'creator', 'admin'], default: 'customer' },
  avatar:   { type: String, default: '' },
  resetPasswordToken:  String,
  resetPasswordExpire: Date
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', UserSchema);
