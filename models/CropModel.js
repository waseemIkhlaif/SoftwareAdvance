const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Crop = sequelize.define('Crop', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    }
});

Crop.associate = models => {
    Crop.hasMany(models.CropPlan, { foreignKey: 'crop_id' });
};

module.exports = Crop;