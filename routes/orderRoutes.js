const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrderStatus, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/mine', protect, getMyOrders);
router.put('/:id', updateOrderStatus);

module.exports = router;