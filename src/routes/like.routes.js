const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like.controller');
const validateFields = require('../middlewares/validateFields');
const authenticateToken = require('../middlewares/authenticateToken');

router.post('/like-clothes', validateFields(['user_id', 'clothes_id']), likeController.likeToClothes);
router.post('/unsubscribe-like', validateFields(['user_id', 'clothes_id']), likeController.unsubscribeLike);
router.get('/get-like-clothes/:userId', likeController.getLikeClothes);

module.exports = router;