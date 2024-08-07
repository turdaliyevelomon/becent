const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Clothes = require('./clothes'); 

const Cart = sequelize.define('Cart', {
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
    tableName: 'carts'
});

Cart.belongsTo(Clothes, { foreignKey: 'clothes_id' });

module.exports = Cart;
