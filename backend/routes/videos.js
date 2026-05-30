const express = require('express');
const router = express.Router({ mergeParams: true });
const { getVideos, addVideo, deleteVideo } = require('../controllers/videoController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getVideos);
router.post('/', protect, authorize('creator', 'admin'), addVideo);
router.delete('/:id', protect, authorize('creator', 'admin'), deleteVideo);

module.exports = router;
