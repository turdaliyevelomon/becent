// src/routes/clothes.routes.js

const express = require('express');
const router = express.Router();
const clothesController = require('../controllers/clothes.controller');
const validateFields = require('../middlewares/validateFields');
const authenticateToken = require('../middlewares/authenticateToken');
const upload = require('../middlewares/upload'); 

router.get('/get-clothes', clothesController.getClothes);
router.get('/get-clothes/:id', clothesController.getClothesId);

router.post('/create-clothes', upload.single("images"), 
validateFields(['category', 'title', 'description', 'price', 'gender']),  
clothesController.createClothes);

router.put('/update-clothes/:id', upload.single("images"), 
    clothesController.updateClothes);
    
router.delete('/delete-clothes/:id', clothesController.deleteClothes);

module.exports = router;