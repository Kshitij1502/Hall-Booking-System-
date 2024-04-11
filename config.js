const config = {
    database: {
      // MongoDB connection URI
      connectionString: 'your mongodb url',
    },
    server: {
      // Port for the server to listen on
      port: process.env.PORT || 5000,
    },
    // Other configuration options can be added here
  };
  
  module.exports = config;
  
