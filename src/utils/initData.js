const User = require('../models/User');
const Fruit = require('../models/Fruit');
const Review = require('../models/Review');
const bcrypt = require('bcryptjs');
const fruits = require('./fruitsData');

const initData = async () => {
  try {
    // Check if data already exists
    const fruitsCount = await Fruit.countDocuments();
    if (fruitsCount > 0) {
      console.log('Data already initialized, skipping...');
      return;
    }

    console.log('Initializing data...');

    // Create admin user
    // const adminPassword = await bcrypt.hash('admin123', 10);
    // const adminUser = await User.create({
    //   username: 'admin',
    //   password: await bcrypt.hash('admin123', 10),
    //   email: 'admin@fruit.shop',
    //   role: 'admin'
    // });
    // console.log('Admin user created');

    // Create normal users
    const users = await User.insertMany([
      {
        username: 'admin',
        password: await bcrypt.hash('admin123', 10),
        email: 'admin@fruit.shop',
        role: 'admin'
      },
      {
        username: 'rajeshkumar',
        password: await bcrypt.hash('rajesh123', 10),
        email: 'rajesh@fruit.shop',
        role: 'user'
      },
      {
        username: 'priyasingh',
        password: await bcrypt.hash('priya123', 10),
        email: 'priya@fruit.shop',
        role: 'user'
      },
      {
        username: 'amitpatel',
        password: await bcrypt.hash('amit123', 10),
        email: 'amit@fruit.shop',
        role: 'user'
      },
      {
        username: 'nehaverma',
        password: await bcrypt.hash('neha123', 10),
        email: 'neha@fruit.shop',
        role: 'user'
      },
      {
        username: 'sureshrao',
        password: await bcrypt.hash('suresh123', 10),
        email: 'suresh@fruit.shop',
        role: 'user'
      },
      {
        username: 'meenakshi',
        password: await bcrypt.hash('meena123', 10),
        email: 'meena@fruit.shop',
        role: 'user'
      },
      {
        username: 'vikasgupta',
        password: await bcrypt.hash('vikas123', 10),
        email: 'vikas@fruit.shop',
        role: 'user'
      },
      {
        username: 'jonybhaai',
        password: await bcrypt.hash('Kitty@2005', 10),
        email: 'jonybhaai@fruit.shop',
        role: 'user'
      }
    ]);
    console.log('Normal users created');

    // Create special user (jonybhai)
    // const specialUser = await User.create({
    //   username: 'jonybhaai',
    //   password: await bcrypt.hash('Kitty@2005', 10),
    //   email: 'jonybhaai@fruit.shop',
    //   role: 'user'
    // });
    // console.log('Special user created');

    // Add fruits
    const createdFruits = await Fruit.insertMany(fruits);
    console.log('Fruits created');

    // Find a user name jonybhaai and add a special comment to the review
    const specialUser = await User.findOne({ username: 'jonybhaai' });
    console.log('Special user found:', specialUser);


    // Add special review with OSINT clue (more subtle hint)
    await Review.create({
      fruit: createdFruits[0]._id,
      user: specialUser._id,
      rating: 5,
      comment: "These apples are purr-fect! 🐱 Follow my socials - Insta: @jonybhaai and LinkedIn. My furry friend who sits on my keyboard while coding would definitely give this 5 stars too! 🐈"
    });
    console.log('Special review created');

    // Add regular user reviews
    const reviews = [
      {
        fruit: createdFruits[1]._id,
        user: users[0]._id,
        rating: 4,
        comment: "These bananas are super fresh! Great for my morning smoothie. 🍌"
      },
      {
        fruit: createdFruits[2]._id,
        user: users[1]._id,
        rating: 5,
        comment: "Best mangoes I've ever had! Reminds me of summer in Gujarat! 🥭"
      },
      {
        fruit: createdFruits[3]._id,
        user: users[2]._id,
        rating: 4,
        comment: "Fresh pineapple, perfect sweetness! Made a great fruit chat. 🍍"
      },
      {
        fruit: createdFruits[4]._id,
        user: users[3]._id,
        rating: 5,
        comment: "These strawberries are amazing in my morning parfait! 🍓"
      },
      {
        fruit: createdFruits[5]._id,
        user: users[4]._id,
        rating: 4,
        comment: "Love these blueberries! Great antioxidant boost! 💙"
      },
      {
        fruit: createdFruits[6]._id,
        user: users[5]._id,
        rating: 5,
        comment: "Made the best blackberry jam with these! 😋"
      },
      {
        fruit: createdFruits[7]._id,
        user: users[6]._id,
        rating: 4,
        comment: "Fresh kiwis! Perfect tangy taste! 🥝"
      }
    ];

    await Review.insertMany(reviews);
    console.log('Regular reviews created');

    console.log('Data initialization complete!');
  } catch (error) {
    console.error('Error initializing data:', error);
    throw error; // Re-throw to handle in the server initialization
  }
};

module.exports = initData;