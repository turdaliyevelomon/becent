//src/config/database.js

const Sequelize = require('sequelize');

const sequelize = new Sequelize('imti', 'postgres', '2002', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;
