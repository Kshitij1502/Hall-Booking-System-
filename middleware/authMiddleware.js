// authMiddleware.js

const jwt = require('jsonwebtoken');

// Replace 'YOUR_SECRET_KEY' with your actual JWT secret key
const jwtSecret = 'PATELKSHITIJANILBHAIPATELVANSHDHARMESHBHAI';

// Middleware function to authenticate requests
const authenticateToken = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401); // No token provided, Unauthorized
  }

  // Verify the JWT token
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Invalid or expired token, Forbidden
    }
    req.user = user; // Attach the decoded user object to the request
    next(); // Call the next middleware in the chain
  });
};

module.exports = {
  authenticateToken
};
