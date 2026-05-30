const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
  owner:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:        { type: String, required: true, trim: true },
  description: { type: String },
  category:    { type: String, required: true },
  area:        { type: String, required: true },
  address:     { type: String },
  phone:       { type: String },
  whatsapp:    { type: String },
  mapLink:     { type: String },
  logo:        { type: String, default: '' },
  photos:      [String],
  tags:        [String],
  featured:    { type: Boolean, default: false },
  trending:    { type: Boolean, default: false },
  rating:      { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Shop', ShopSchema);
