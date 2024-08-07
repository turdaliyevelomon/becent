// // src/controllers/auth.controller.js

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// SHA-256 bilan hashing funksiyasi
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const register = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const hashedPassword = hashPassword(password);
  
      const user = await User.create({ username, email, password: hashedPassword });
  
      const token = jwt.sign({ id: user.id, email: user.email }, 'secret_key', { expiresIn: '1h' });
  
      return res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error registering user' });
    }
  };

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const hashedPassword = hashPassword(password);
    if (hashedPassword !== user.password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 'secret_key', { expiresIn: '1h' });

    return res.status(200).json({ message: 'User logged in successfully', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error logging in' });
  }
};

const getUserId = async (req, res) => {
    const userId = req.user.id; 
  
    return res.status(200).json({ userId });
};

module.exports = {
  register,
  login,
  getUserId,
};
