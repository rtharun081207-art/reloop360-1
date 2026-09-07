const Material = require('../models/Material');

async function getMaterials(req, res) {
  try {
    const { listingType } = req.query;
    const filter = { listingType: listingType || 'sell' };
    const materials = await Material.find(filter).sort({ createdAt: -1 });
    res.json({ count: materials.length, materials });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch materials', error: err.message });
  }
}

async function getMaterialById(req, res) {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) return res.status(404).json({ message: 'Material not found' });
    res.json(material);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch material', error: err.message });
  }
}

async function createMaterial(req, res) {
  try {
    const { icon, name, description, qty, cond, loc, seller, listingType } = req.body;
    const material = await Material.create({
      icon, name, description, qty, cond, loc,
      seller: req.user ? req.user.name : seller,
      sellerId: req.user ? req.user.id : undefined,
      listingType: listingType || 'sell',
    });
    res.status(201).json(material);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create material', error: err.message });
  }
}

async function updateMaterial(req, res) {
  try {
    const material = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!material) return res.status(404).json({ message: 'Material not found' });
    res.json(material);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update material', error: err.message });
  }
}

async function deleteMaterial(req, res) {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) return res.status(404).json({ message: 'Material not found' });
    res.json({ message: 'Material deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete material', error: err.message });
  }
}

module.exports = { getMaterials, getMaterialById, createMaterial, updateMaterial, deleteMaterial };