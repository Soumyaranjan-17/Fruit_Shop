const express = require('express');
const router = express.Router();
const Fruit = require('../models/Fruit');
const Review = require('../models/Review');

router.get('/:id', async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);
    const reviews = await Review.find({ fruit: req.params.id }).populate('user');
    res.render('fruit-detail', { fruit, reviews, user: req.session.user });
  } catch (error) {
    res.redirect('/');
  }
});

router.post('/:id/review', async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }

  try {
    const { rating, comment } = req.body;
    await Review.create({
      fruit: req.params.id,
      user: req.session.user.id,
      rating,
      comment
    });
    res.redirect(`/fruits/${req.params.id}`);
  } catch (error) {
    res.redirect(`/fruits/${req.params.id}`);
  }
});

module.exports = router;