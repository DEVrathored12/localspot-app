const express = require('express');
const router = express.Router({ mergeParams: true });
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getProducts);
router.post('/', protect, authorize('shop', 'admin'), createProduct);
router.put('/:id', protect, authorize('shop', 'admin'), updateProduct);
router.delete('/:id', protect, authorize('shop', 'admin'), deleteProduct);

module.exports = router;
