const express = require('express');
const router = express.Router();
const { protect, optionalAuth } = require('../middleware/authMiddleware');
const {
  createExchange, getExchanges, proposeSwap, getMyExchanges, respondToProposal,
} = require('../controllers/exchangeController');

router.post('/', optionalAuth, createExchange);
router.get('/', getExchanges);
router.get('/mine', protect, getMyExchanges);
router.post('/:id/propose', protect, proposeSwap);
router.put('/:id/proposals/:proposalId', protect, respondToProposal);

module.exports = router;