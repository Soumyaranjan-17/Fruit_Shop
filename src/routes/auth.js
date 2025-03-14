const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.redirect('/auth/login');
  }
};

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!user) {
      return res.render('login', { error: 'Invalid credentials' });
    }

    if (!isValidPassword) {
      return res.render('login', { error: 'Invalid password' });
    }

    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    // Set secret key for jonybhai
    if (user.email === 'jonybhai@example.com') {
      req.session.secretKey = 'CTF{0S1NT_M4ST3R_2023}';
    }

    // Ensure session is saved before redirect
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.render('login', { error: 'Login failed' });
      }

      if (user.role === 'admin') {
        res.redirect('/admin');
      } else {
        res.redirect('/');
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.render('login', { error: 'Login failed' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await User.create({ username, email, password });
    res.redirect('/auth/login');
  } catch (error) {
    res.render('register', { error: 'Registration failed' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = { router, isAdmin };