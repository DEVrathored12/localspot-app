const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  shop:    { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  url:     { type: String, required: true },
  title:   { type: String },
  views:   { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Video', VideoSchema);
