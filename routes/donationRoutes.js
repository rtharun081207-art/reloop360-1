const express = require('express');
const router = express.Router();
const { protect, optionalAuth } = require('../middleware/authMiddleware');
const {
  createDonation, getDonations, getMyDonations, updateDonationStatus,
} = require('../controllers/donationController');

router.post('/', optionalAuth, createDonation);
router.get('/', getDonations);
router.get('/mine', protect, getMyDonations);
router.put('/:id/status', protect, updateDonationStatus);

module.exports = router;