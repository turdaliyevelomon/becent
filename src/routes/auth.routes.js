// src/routes/auth.routes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authenticateToken = require('../middlewares/authenticateToken')

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/get-user-id', authenticateToken, authController.getUserId);

module.exports = router;
