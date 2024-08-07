const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const validateFields = require('../middlewares/validateFields');
const authenticateToken = require('../middlewares/authenticateToken');

router.post('/cart-clothes', validateFields(['user_id', 'clothes_id']), cartController.cartToClothes);
router.post('/unsubscribe-cart', validateFields(['user_id', 'clothes_id']), cartController.unsubscribeCart);
router.get('/get-cart-clothes/:userId', cartController.getCartClothes);

module.exports = router;