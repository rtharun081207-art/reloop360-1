const express = require('express');
const router = express.Router();
const { optionalAuth } = require('../middleware/authMiddleware');
const {
  getMaterials, getMaterialById, createMaterial, updateMaterial, deleteMaterial,
} = require('../controllers/materialController');

router.get('/', getMaterials);
router.get('/:id', getMaterialById);
router.post('/', optionalAuth, createMaterial);
router.put('/:id', updateMaterial);
router.delete('/:id', deleteMaterial);

module.exports = router;