const User = require('../models/User');
const Video = require('../models/Video');

exports.getCreators = async (req, res, next) => {
  try {
    const creators = await User.find({ role: 'creator' }).select('-password');
    res.json({ success: true, count: creators.length, data: creators });
  } catch (err) { next(err); }
};

exports.getCreator = async (req, res, next) => {
  try {
    const creator = await User.findById(req.params.id).select('-password');
    if (!creator) return res.status(404).json({ success: false, message: 'Creator not found' });
    const videos = await Video.find({ creator: req.params.id }).populate('shop', 'name area');
    res.json({ success: true, data: { creator, videos } });
  } catch (err) { next(err); }
};
