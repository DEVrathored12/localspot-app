const express = require('express');
const router = express.Router();
const { getCreators, getCreator } = require('../controllers/creatorController');

router.get('/', getCreators);
router.get('/:id', getCreator);

module.exports = router;
