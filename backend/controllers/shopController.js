const Shop = require('../models/Shop');

exports.getShops = async (req, res, next) => {
  try {
    const shops = await Shop.find().populate('owner', 'name email');
    res.json({ success: true, count: shops.length, data: shops });
  } catch (err) { next(err); }
};

exports.getShop = async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.id).populate('owner', 'name email');
    if (!shop) return res.status(404).json({ success: false, message: 'Shop not found' });
    res.json({ success: true, data: shop });
  } catch (err) { next(err); }
};

exports.createShop = async (req, res, next) => {
  try {
    req.body.owner = req.user.id;
    const shop = await Shop.create(req.body);
    res.status(201).json({ success: true, data: shop });
  } catch (err) { next(err); }
};

exports.updateShop = async (req, res, next) => {
  try {
    const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!shop) return res.status(404).json({ success: false, message: 'Shop not found' });
    res.json({ success: true, data: shop });
  } catch (err) { next(err); }
};

exports.deleteShop = async (req, res, next) => {
  try {
    const shop = await Shop.findByIdAndDelete(req.params.id);
    if (!shop) return res.status(404).json({ success: false, message: 'Shop not found' });
    res.json({ success: true, message: 'Shop deleted' });
  } catch (err) { next(err); }
};

exports.getFeaturedShops = async (req, res, next) => {
  try {
    const shops = await Shop.find({ featured: true });
    res.json({ success: true, count: shops.length, data: shops });
  } catch (err) { next(err); }
};

exports.getShopsByArea = async (req, res, next) => {
  try {
    const shops = await Shop.find({ area: new RegExp(req.params.area, 'i') });
    res.json({ success: true, count: shops.length, data: shops });
  } catch (err) { next(err); }
};

exports.getShopsByCategory = async (req, res, next) => {
  try {
    const shops = await Shop.find({ category: new RegExp(req.params.category, 'i') });
    res.json({ success: true, count: shops.length, data: shops });
  } catch (err) { next(err); }
};

exports.searchShops = async (req, res, next) => {
  try {
    const q = req.query.q || '';
    const shops = await Shop.find({ $or: [
      { name: new RegExp(q, 'i') },
      { description: new RegExp(q, 'i') },
      { tags: new RegExp(q, 'i') }
    ]});
    res.json({ success: true, count: shops.length, data: shops });
  } catch (err) { next(err); }
};
