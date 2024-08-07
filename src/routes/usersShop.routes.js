
// usersShop.routes.js
const express = require('express');
const router = express.Router();
const usersShopController = require('../controllers/usersShop.controller');

router.post('/create-usersShop', usersShopController.createUserShop);
router.delete('/delete-usersShop/:id', usersShopController.deleteUserShop);
router.get('/get-usersShop', usersShopController.getAllUserShops);

router.get('/get-usersShop/:id', usersShopController.getIdUserShops);

module.exports = router;