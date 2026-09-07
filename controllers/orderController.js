const Order = require('../models/Order');
const Product = require('../models/Product');

async function createOrder(req, res) {
  try {
    const { productId, buyerName, mode } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.status === 'requested' || product.status === 'sold')
      return res.status(400).json({ message: 'Product is no longer available' });

    const order = await Order.create({
      product: productId,
      buyerName: req.user ? req.user.name : buyerName,
      buyerId: req.user ? req.user.id : undefined,
      sellerName: product.seller,
      mode: mode || 'buy',
    });
    product.status = 'requested';
    await product.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create order', error: err.message });
  }
}

async function getOrders(req, res) {
  try {
    const { seller, buyer } = req.query;
    const filter = {};
    if (seller) filter.sellerName = seller;
    if (buyer) filter.buyerName = buyer;
    const orders = await Order.find(filter).populate('product').sort({ createdAt: -1 });
    res.json({ count: orders.length, orders });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.status = status;
    await order.save();
    const product = await Product.findById(order.product);
    if (product) {
      if (status === 'rejected') product.status = 'available';
      if (status === 'completed') product.status = 'sold';
      await product.save();
    }
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update order', error: err.message });
  }
}

async function getMyOrders(req, res) {
  try {
    const sent = await Order.find({ buyerId: req.user.id }).populate('product').sort({ createdAt: -1 });
    const received = await Order.find({ sellerName: req.user.name }).populate('product').sort({ createdAt: -1 });
    res.json({ sent, received });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your orders', error: err.message });
  }
}

module.exports = { createOrder, getOrders, updateOrderStatus, getMyOrders };