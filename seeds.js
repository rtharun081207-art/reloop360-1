require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');

const demoProducts = [
  { icon: '📘', name: 'Programming Fundamentals (Used)', cat: 'Books', price: 250, cond: 'Good', loc: 'Chennai', seller: 'Ravi K.', verified: true, exchange: true },
  { icon: '👕', name: 'Denim Jacket, Good Condition', cat: 'Clothes', price: 450, cond: 'Good', loc: 'Bengaluru', seller: 'Meera S.', verified: false, exchange: true },
  { icon: '🎧', name: 'Wireless Headphones', cat: 'E-Waste', price: 700, cond: 'Working', loc: 'Chennai', seller: 'TechReuse Hub', verified: true, exchange: false },
  { icon: '🪑', name: 'Study Table, Pre-owned', cat: 'Furniture', price: 1200, cond: 'Good', loc: 'Coimbatore', seller: 'Home Circle', verified: true, exchange: false },
  { icon: '📗', name: 'Engineering Mathematics', cat: 'Books', price: 180, cond: 'Used', loc: 'Hyderabad', seller: 'Ajay P.', verified: false, exchange: true },
  { icon: '⌨️', name: 'Mechanical Keyboard', cat: 'E-Waste', price: 900, cond: 'Used', loc: 'Chennai', seller: 'TechReuse Hub', verified: true, exchange: true },
  { icon: '🧥', name: 'Winter Hoodie', cat: 'Clothes', price: 0, cond: 'Good', loc: 'Bengaluru', seller: 'Community Drive', verified: true, exchange: false },
  { icon: '📚', name: 'Novel Collection (12 books)', cat: 'Books', price: 0, cond: 'Good', loc: 'Chennai', seller: 'ReadForward Trust', verified: true, exchange: true },
];

async function seed() {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(demoProducts);
  console.log(`✅ Seeded ${demoProducts.length} products`);
  mongoose.connection.close();
}

seed();