const express = require('express');
const router = express.Router();
const { register, login, logout, getMe, forgotPassword, resetPassword, googleAuth, uploadAvatar } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);
router.post('/google', googleAuth);
router.put('/avatar', protect, uploadAvatar);

module.exports = router;
