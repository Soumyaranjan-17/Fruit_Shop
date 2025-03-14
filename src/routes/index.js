const express = require('express');
const router = express.Router();
const Fruit = require('../models/Fruit');

router.get('/', async (req, res) => {
  const fruits = await Fruit.find();
  res.render('home', { 
    fruits,
    user: req.session.user 
  });
});

module.exports = router;