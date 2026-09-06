const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.get('/matches/:productId', matchController.findMatchesForProduct);
router.get('/matches', matchController.findAllMatches);

module.exports = router;