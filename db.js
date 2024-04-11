
const mongoose = require("mongoose");

// MongoDB connection URI
const mongoDBURL = 'Enter Your Mongodb url here';

mongoose.connect(mongoDBURL)
  .then(() => console.log(`Mongo DB Connection Successful`))
  .catch(err => console.error(`Mongo DB Connection Failed: ${err}`));

module.exports = mongoose;
