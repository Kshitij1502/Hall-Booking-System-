const config = {
    database: {
      // MongoDB connection URI
      connectionString: 'mongodb+srv://Kshitij1502:22706012345@hallbooking.izfabxm.mongodb.net/HallBooking',
    },
    server: {
      // Port for the server to listen on
      port: process.env.PORT || 5000,
    },
    // Other configuration options can be added here
  };
  
  module.exports = config;
  