const Review = require('../models/Review');
const Shop = require('../models/Shop');

exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ shop: req.params.shopId }).populate('user', 'name avatar');
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (err) { next(err); }
};

exports.addReview = async (req, res, next) => {
  try {
    req.body.shop = req.params.shopId;
    req.body.user = req.user.id;
    const review = await Review.create(req.body);
    // update shop rating
    const reviews = await Review.find({ shop: req.params.shopId });
    const avg = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
    await Shop.findByIdAndUpdate(req.params.shopId, { rating: avg.toFixed(1), reviewCount: reviews.length });
    res.status(201).json({ success: true, data: review });
  } catch (err) { next(err); }
};

exports.deleteReview = async (req, res, next) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Review deleted' });
  } catch (err) { next(err); }
};
