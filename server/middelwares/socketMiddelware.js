const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); 
require('dotenv').config();

const socketAuthentication = async (socket, next) => {
  const token = socket.handshake.headers['authorization'];

  if (!token) {
    return next(new Error('Authentication error'));
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.TOKEN_KEY); 
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new Error('Authentication error'));
    }
    socket.user = user; 
    next();
  } catch (err) {
    return next(new Error('Authentication error'));
  }
};

module.exports = socketAuthentication;
