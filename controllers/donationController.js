const Donation = require('../models/Donation');

async function createDonation(req, res) {
  try {
    const { icon, itemName, category, description, ngoName, loc } = req.body;
    const donation = await Donation.create({
      icon, itemName, category, description, ngoName, loc,
      donorName: req.user ? req.user.name : (req.body.donorName || 'Anonymous'),
      donorId: req.user ? req.user.id : undefined,
    });
    res.status(201).json(donation);
  } catch (err) {
    res.status(400).json({ message: 'Failed to save donation', error: err.message });
  }
}

async function getDonations(req, res) {
  try {
    const { ngoName, category } = req.query;
    const filter = {};
    if (ngoName) filter.ngoName = ngoName;
    if (category) filter.category = category;
    const donations = await Donation.find(filter).sort({ createdAt: -1 });
    res.json({ count: donations.length, donations });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch donations', error: err.message });
  }
}

async function getMyDonations(req, res) {
  try {
    const donations = await Donation.find({ donorId: req.user.id }).sort({ createdAt: -1 });
    res.json({ count: donations.length, donations });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your donations', error: err.message });
  }
}

async function updateDonationStatus(req, res) {
  try {
    const { status } = req.body;
    const donation = await Donation.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!donation) return res.status(404).json({ message: 'Donation not found' });
    res.json(donation);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update donation', error: err.message });
  }
}

module.exports = { createDonation, getDonations, getMyDonations, updateDonationStatus };