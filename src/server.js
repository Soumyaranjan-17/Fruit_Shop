require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const morgan = require('morgan');
const app = express();

// Connect to MongoDB and initialize data only after successful connection
async function initializeServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
    });
    console.log('Connected to MongoDB');
    mongoose.set('debug', true); // Enable query logging

    // Initialize data after successful connection
    const initData = require('./utils/initData');
    await initData();

    // Start the server only after database initialization
    // run on every interfave like live server or local server

    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`This Server running on port http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev')); // Add request logging

// Configure session before routes
app.use(session({
  secret: 'ctf-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGODB_URI,
    ttl: 24 * 60 * 60 // Session TTL of 1 day
  }),
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
  }
}));

// Add user to all responses
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth').router);
app.use('/admin', require('./routes/admin'));
app.use('/fruits', require('./routes/fruits'));

// Initialize the server
initializeServer();
