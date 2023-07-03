const jwt = require('jsonwebtoken');

// Middleware to authenticate the user token
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'lkjpqjcnporsthmlpqsc', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};

// Middleware to check if the user is an administrator
exports.checkAdmin = (req, res, next) => {
  if (req.user.esadministrador) {
    next();
  } else {
    return res.status(403).json({ message: 'Unauthorized' });
  }
};
