const Exchange = require('../models/Exchange');

async function createExchange(req, res) {
  try {
    const { icon, offerItem, wantItem, loc } = req.body;
    const exchange = await Exchange.create({
      icon, offerItem, wantItem, loc,
      ownerName: req.user ? req.user.name : (req.body.ownerName || 'Anonymous'),
      ownerId: req.user ? req.user.id : undefined,
    });
    res.status(201).json(exchange);
  } catch (err) {
    res.status(400).json({ message: 'Failed to post exchange offer', error: err.message });
  }
}

async function getExchanges(req, res) {
  try {
    const exchanges = await Exchange.find({ status: 'open' }).sort({ createdAt: -1 });
    res.json({ count: exchanges.length, exchanges });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch exchange offers', error: err.message });
  }
}

async function proposeSwap(req, res) {
  try {
    const { message } = req.body;
    const exchange = await Exchange.findById(req.params.id);
    if (!exchange) return res.status(404).json({ message: 'Exchange offer not found' });

    exchange.proposals.push({
      fromUserId: req.user.id,
      fromName: req.user.name,
      message: message || '',
    });
    await exchange.save();
    res.status(201).json(exchange);
  } catch (err) {
    res.status(400).json({ message: 'Failed to send proposal', error: err.message });
  }
}

async function getMyExchanges(req, res) {
  try {
    const posted = await Exchange.find({ ownerId: req.user.id }).sort({ createdAt: -1 });
    const proposedTo = await Exchange.find({ 'proposals.fromUserId': req.user.id }).sort({ createdAt: -1 });
    res.json({ posted, proposedTo });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your exchanges', error: err.message });
  }
}

async function respondToProposal(req, res) {
  try {
    const { status } = req.body; // 'accepted' or 'rejected'
    const exchange = await Exchange.findById(req.params.id);
    if (!exchange) return res.status(404).json({ message: 'Exchange offer not found' });

    const proposal = exchange.proposals.id(req.params.proposalId);
    if (!proposal) return res.status(404).json({ message: 'Proposal not found' });

    proposal.status = status;
    if (status === 'accepted') exchange.status = 'closed';
    await exchange.save();
    res.json(exchange);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update proposal', error: err.message });
  }
}

module.exports = { createExchange, getExchanges, proposeSwap, getMyExchanges, respondToProposal };