// routes/shops.js — Shop Routes
const express = require('express');
const router = express.Router();
const {
  getShops, getShop, createShop, updateShop, deleteShop,
  getFeaturedShops, getShopsByArea, getShopsByCategory, searchShops
} = require('../controllers/shopController');
const { protect, authorize } = require('../middleware/auth');

router.get('/',           getShops);
router.get('/featured',   getFeaturedShops);
router.get('/search',     searchShops);
router.get('/area/:area', getShopsByArea);
router.get('/category/:category', getShopsByCategory);
router.get('/:id',        getShop);
router.post('/',          protect, authorize('shop', 'admin'), createShop);
router.put('/:id',        protect, authorize('shop', 'admin'), updateShop);
router.delete('/:id',     protect, authorize('shop', 'admin'), deleteShop);

module.exports = router;