const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const https = require('https');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '30d' });

const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);
  const options = {
    expires: new Date(Date.now() + (parseInt(process.env.JWT_COOKIE_EXPIRE) || 30) * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };
  res.status(statusCode).cookie('token', token, options).json({
    success: true, token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar }
  });
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, phone, password, role } = req.body;
    if (await User.findOne({ email }))
      return res.status(400).json({ success: false, message: 'Email already registered' });
    const user = await User.create({ name, email, phone, password, role: role || 'customer' });
    sendTokenResponse(user, 201, res);
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    sendTokenResponse(user, 200, res);
  } catch (err) { next(err); }
};

exports.logout = (req, res) => {
  res.cookie('token', 'none', { expires: new Date(Date.now() + 10 * 1000), httpOnly: true });
  res.json({ success: true, message: 'Logged out' });
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ success: true, user });
  } catch (err) { next(err); }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ success: false, message: 'No user with that email' });
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password.html?token=${resetToken}`;
    try {
      await sendEmail({
        to: user.email,
        subject: 'LocalSpot — Password Reset',
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:auto">
            <h2 style="color:#1a3c6e">Reset Your Password</h2>
            <p>Click the button below to reset your password. This link expires in <strong>10 minutes</strong>.</p>
            <a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#1a3c6e;color:#fff;border-radius:8px;text-decoration:none;font-weight:600">Reset Password</a>
            <p style="margin-top:16px;font-size:12px;color:#999">If you didn't request this, ignore this email.</p>
          </div>`
      });
      res.json({ success: true, message: 'Password reset link sent to your email.' });
    } catch (emailErr) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ success: false, message: 'Email could not be sent. Try again later.' });
    }
  } catch (err) { next(err); }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendTokenResponse(user, 200, res);
  } catch (err) { next(err); }
};

exports.uploadAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    if (!avatar) return res.status(400).json({ success: false, message: 'No image provided' });
    if (avatar.length > 2 * 1024 * 1024)
      return res.status(400).json({ success: false, message: 'Image too large (max 2MB)' });
    const user = await User.findByIdAndUpdate(req.user.id, { avatar }, { new: true });
    res.json({ success: true, avatar: user.avatar });
  } catch (err) { next(err); }
};
  try {
    const { access_token, name, email } = req.body;
    if (!access_token || !email)
      return res.status(400).json({ success: false, message: 'Missing token or email' });

    // Verify the access token with Google
    const googleRes = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    if (!googleRes.ok)
      return res.status(401).json({ success: false, message: 'Invalid Google token' });
    const profile = await googleRes.json();
    if (profile.email !== email)
      return res.status(401).json({ success: false, message: 'Token email mismatch' });

    let user = await User.findOne({ email: profile.email });
    if (!user) {
      const randomPass = crypto.randomBytes(32).toString('hex');
      user = await User.create({ name: profile.name || name, email: profile.email, password: randomPass, role: 'customer' });
    }
    sendTokenResponse(user, 200, res);
  } catch (err) { next(err); }
};
