const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Clothes = require('./clothes'); 

const UsersShop = sequelize.define('UsersShop', {
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
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'usersShop'
});

UsersShop.belongsTo(Clothes, { foreignKey: 'clothes_id' });

module.exports = UsersShop;
