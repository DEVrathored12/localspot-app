const Product = require('../models/Product');

exports.getProducts = async (req, res, next) => {
  try {
    const filter = req.params.shopId ? { shop: req.params.shopId } : {};
    const products = await Product.find(filter);
    res.json({ success: true, count: products.length, data: products });
  } catch (err) { next(err); }
};

exports.createProduct = async (req, res, next) => {
  try {
    req.body.shop = req.params.shopId;
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) { next(err); }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('shop');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    if (product.shop.owner.toString() !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ success: false, message: 'Not authorized' });
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, data: updated });
  } catch (err) { next(err); }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('shop');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    if (product.shop.owner.toString() !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ success: false, message: 'Not authorized' });
    await product.deleteOne();
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) { next(err); }
};
