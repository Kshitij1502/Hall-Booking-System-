// const mongoose = require("mongoose");

// var mongoDBURL = 'mongodb+srv://Kshitij1502:22706012345@hallbooking.izfabxm.mongodb.net/HallBooking';

// mongoose.connect(mongoDBURL)
//   .then(() => console.log(`Mongo DB Connection Successful`))
//   .catch(err => console.error(`Mongo DB Connection Failed: ${err}`));

// module.exports = mongoose;
const mongoose = require("mongoose");

// MongoDB connection URI
const mongoDBURL = 'Enter Your Mongodb url here';

mongoose.connect(mongoDBURL)
  .then(() => console.log(`Mongo DB Connection Successful`))
  .catch(err => console.error(`Mongo DB Connection Failed: ${err}`));

module.exports = mongoose;
