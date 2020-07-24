const jwt = require('jsonwebtoken');

// middleware to validate token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: { message: 'Access denied' } });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: { message: 'Token is not valid' } });
  }
};

module.exports = verifyToken;
