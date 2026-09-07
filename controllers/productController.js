const Product = require('../models/Product');

async function getProducts(req, res) {
  try {
    const { category, free, verified, exchange, location, sort, listingType } = req.query;
    const filter = {};

    if (category && category !== 'All') filter.cat = category;
    if (free === 'true') filter.price = 0;
    if (verified === 'true') filter.verified = true;
    if (exchange === 'true') filter.exchange = true;
    if (location && location !== 'all') filter.loc = location;
    filter.listingType = listingType || 'sell';

    let query = Product.find(filter);

    if (sort === 'low') query = query.sort({ price: 1 });
    if (sort === 'high') query = query.sort({ price: -1 });
    if (!sort || sort === 'popular') query = query.sort({ createdAt: -1 });

    const products = await query.exec();
    res.json({ count: products.length, products });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
}

async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product', error: err.message });
  }
}

async function createProduct(req, res) {
  try {
    const { icon, name, description, cat, price, cond, loc, seller, verified, exchange, listingType } = req.body;
    const product = await Product.create({
      icon, name, description, cat, price, cond, loc,
      seller: req.user ? req.user.name : seller,
      sellerId: req.user ? req.user.id : undefined,
      verified, exchange,
      listingType: listingType || 'sell',
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create product', error: err.message });
  }
}

async function updateProduct(req, res) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update product', error: err.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product', error: err.message });
  }
}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };