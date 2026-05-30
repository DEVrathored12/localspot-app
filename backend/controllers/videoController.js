const Video = require('../models/Video');

exports.getVideos = async (req, res, next) => {
  try {
    const videos = await Video.find({ shop: req.params.shopId }).populate('creator', 'name avatar');
    res.json({ success: true, count: videos.length, data: videos });
  } catch (err) { next(err); }
};

exports.addVideo = async (req, res, next) => {
  try {
    req.body.shop = req.params.shopId;
    req.body.creator = req.user.id;
    const video = await Video.create(req.body);
    res.status(201).json({ success: true, data: video });
  } catch (err) { next(err); }
};

exports.deleteVideo = async (req, res, next) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Video deleted' });
  } catch (err) { next(err); }
};
