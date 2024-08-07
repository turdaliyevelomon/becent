// src/models/clothes.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Clothes = sequelize.define('Clothe', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    images: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING 
    },
    title: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    description: {
        type: DataTypes.STRING 
    },
    price: {
        type: DataTypes.FLOAT, 
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM('male', 'female'),
    }
}, {
    tableName: 'clothes'
});

module.exports = Clothes;
