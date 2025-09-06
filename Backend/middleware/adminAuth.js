const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. Admin login required.' });
    }

    const decoded = jwt.verify(token, 'my-secret-key');
    
    if (!decoded.admin) {
      return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token. Admin login required.' });
  }
};

module.exports = adminAuth;