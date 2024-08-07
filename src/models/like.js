const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Clothes = require('./clothes'); 

const Like = sequelize.define('Like', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    clothes_id: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'likes'
});

Like.belongsTo(Clothes, { foreignKey: 'clothes_id' });

module.exports = Like;
