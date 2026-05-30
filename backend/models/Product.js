const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  shop:        { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  name:        { type: String, required: true },
  description: { type: String },
  price:       { type: Number },
  image:       { type: String, default: '' },
  inStock:     { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
