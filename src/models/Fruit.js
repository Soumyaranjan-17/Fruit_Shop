const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  inStock: { type: Boolean, default: true }
});

module.exports = mongoose.model('Fruit', fruitSchema);