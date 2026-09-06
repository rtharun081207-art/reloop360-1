const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createOrder, getOrders, updateOrderStatus, getMyOrders } = require('../controllers/orderController');

router.post('/', protect, createOrder);
router.get('/', getOrders);
router.get('/mine', protect, getMyOrders);
router.put('/:id/status', protect, updateOrderStatus);

module.exports = router;