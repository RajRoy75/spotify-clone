// server/middleware/authMiddleware.js

// import { verifyToken } from '../firebaseAdmin';
const {verifyToken} = require('../firebaseAdmin');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decodedToken = await verifyToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
module.exports = {authMiddleware};