//src/controllers/clothes.controller.js

const Clothes = require('../models/clothes');
const path =  require('path')
const Sequelize = require('sequelize');
const User = require('../models/user');
const upload = require('../middlewares/upload');
const fs = require('fs');

const createClothes = async (req, res) => {
  const { category, title, description, price, gender } = req.body;

  try {
    const imageFileName = req.file.filename;
    const imagePath = `/uploads/${imageFileName}`;

    const clothes = await Clothes.create({
      images: imagePath, 
      category,
      title,
      description,
      price,
      gender
    });

    return res.status(201).json({ message: 'Clothes created successfully', clothes });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error creating clothes' });
  }
};

const getClothes = async (req, res) => {
    try {
      const clothes = await Clothes.findAll();
      if (clothes) {
        return res.json(clothes);
        } else {
            return res.status(404).json({ error: 'Clothes not found' });
        }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error getting clothes' });
    }
};

const getClothesId = async (req, res) => {
  const { id } = req.params;

  try {
    const clothes = await Clothes.findByPk(id);
    if (clothes) {
      return res.json(clothes);
      } else {
          return res.status(404).json({ error: 'Clothes not found' });
      }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error updating clothes' });
  }
};

const updateClothes = async (req, res) => {
    const { id } = req.params;
    const { category, title, description, price, gender } = req.body;

    try {
        const { file } = req;
        const clothes = await Clothes.findByPk(id);

        if (!clothes) {
            return res.status(404).json({ error: 'Clothes not found' });
        }
       
        if(req.file) {
            clothes.images = "/uploads/" + req.file.filename
        } else clothes.images = clothes.images;
    
        clothes.category = category || clothes.category;
        clothes.title = title || clothes.title;
        clothes.description = description || clothes.description;
        clothes.price = price || clothes.price;
        clothes.gender = gender || clothes.gender;

        await clothes.save();

        return res.status(200).json({ message: 'Clothes updated successfully', clothes });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error updating clothes' });
    }
};

const deleteClothes = async (req, res) => {
    const { id } = req.params;
  
    try {
      const clothes = await Clothes.findByPk(id);
  
      if (!clothes) {
        return res.status(404).json({ error: 'Clothes not found' });
      }

      await clothes.destroy();
  
      return res.status(200).json({ message: 'Clothes deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error deleting clothes' });
    }
};

const likeUpdateClothes = async (req, res) => {
  const { id } = req.params;

    try {
        const clothes = await Clothes.findByPk(id);
        if (!clothes) {
            return res.status(404).json({ error: 'Clothes not found' });
        }
      
        clothes.like = 'true';
        await clothes.save();

        return res.status(200).json({ message: 'Clothes updated successfully', clothes });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error updating clothes' });
    }
};
  
module.exports = {
    getClothes,
    getClothesId,
    createClothes,
    updateClothes,
    deleteClothes,
    likeUpdateClothes,
};