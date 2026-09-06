const Product = require('../models/Product');

function getKeywords(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2);
}

function scoreMatch(itemA, itemB) {
  let score = 0;

 if (itemA.cat && itemB.cat && itemA.cat.toLowerCase() === itemB.cat.toLowerCase()) {
    score += 3;
  }

  const keywordsA = getKeywords((itemA.name || '') + ' ' + (itemA.description || ''));
const keywordsB = getKeywords((itemB.name || '') + ' ' + (itemB.description || ''));
  const overlap = keywordsA.filter(word => keywordsB.includes(word));
  score += overlap.length;

  return score;
}

async function findMatchesForProduct(req, res) {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const oppositeType = product.listingType === 'sell' ? 'want' : 'sell';

    const candidates = await Product.find({
      listingType: oppositeType,
      isMatched: false,
      _id: { $ne: product._id },
    });

    const scored = candidates
      .map(candidate => ({ product: candidate, score: scoreMatch(product, candidate) }))
      .filter(entry => entry.score > 0)
      .sort((a, b) => b.score - a.score);

    res.json({ product, matches: scored });
  } catch (err) {
    res.status(500).json({ message: 'Failed to find matches', error: err.message });
  }
}

async function findAllMatches(req, res) {
  try {
    const sellItems = await Product.find({ listingType: 'sell', isMatched: false });
    const wantItems = await Product.find({ listingType: 'want', isMatched: false });

    const results = [];

    for (const sellItem of sellItems) {
      for (const wantItem of wantItems) {
        const score = scoreMatch(sellItem, wantItem);
        if (score > 0) {
          results.push({ sellItem, wantItem, score });
        }
      }
    }

    results.sort((a, b) => b.score - a.score);
    res.json({ totalMatches: results.length, matches: results });
  } catch (err) {
    res.status(500).json({ message: 'Failed to run matching', error: err.message });
  }
}

module.exports = {
  findMatchesForProduct,
  findAllMatches,
};