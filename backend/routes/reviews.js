const express = require('express');
const router = express.Router({ mergeParams: true });
const { getReviews, addReview, deleteReview } = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getReviews);
router.post('/', protect, addReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
