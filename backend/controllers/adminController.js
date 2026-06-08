const User = require('../models/User');
const Shop = require('../models/Shop');
const Video = require('../models/Video');
const Review = require('../models/Review');

exports.getStats = async (req, res, next) => {
  try {
    const [users, shops, creators, videos, reviews] = await Promise.all([
      User.countDocuments(),
      Shop.countDocuments(),
      User.countDocuments({ role: 'creator' }),
      Video.countDocuments(),
      Review.countDocuments()
    ]);
    res.json({ success: true, data: { users, shops, creators, videos, reviews, revenue: 0 } });
  } catch (err) { next(err); }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, count: users.length, data: users });
  } catch (err) { next(err); }
};

exports.deleteUser = async (req, res, next) => {
  try {
    if (req.params.id === req.user.id)
      return res.status(400).json({ success: false, message: 'Cannot delete your own account' });
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, message: 'User deleted' });
  } catch (err) { next(err); }
};
