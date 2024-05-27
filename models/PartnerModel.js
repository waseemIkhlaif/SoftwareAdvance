const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Partner = sequelize.define('Partner', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact_info: {
        type: DataTypes.TEXT
    },
    description: {
        type: DataTypes.TEXT
    }
});

module.exports = Partner;