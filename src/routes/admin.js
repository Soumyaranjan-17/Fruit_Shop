const express = require('express');
const router = express.Router();
const { isAdmin } = require('./auth');
const User = require('../models/User');
const Fruit = require('../models/Fruit');
const Review = require('../models/Review');

router.get('/', isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    const fruits = await Fruit.find();
    const reviews = await Review.find().populate('user fruit');
    res.render('admin/dashboard', { users, fruits, reviews });
  } catch (error) {
    res.redirect('/');
  }
});

// User Management
router.post('/users/:id/delete', isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
  } catch (error) {
    res.redirect('/admin');
  }
});

// Fruit Management
router.post('/fruits/:id/update', isAdmin, async (req, res) => {
  try {
    const { name, price, description, category, inStock } = req.body;
    await Fruit.findByIdAndUpdate(req.params.id, {
      name,
      price,
      description,
      category,
      inStock: inStock === 'true'
    });
    res.redirect('/admin');
  } catch (error) {
    res.redirect('/admin');
  }
});

// Review Management
router.post('/reviews/:id/delete', isAdmin, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
  } catch (error) {
    res.redirect('/admin');
  }
});

module.exports = router;