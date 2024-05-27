const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Garden = sequelize.define('CommunityGarden', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sunlight_conditions: {
        type: DataTypes.STRING
    },
    soil_type: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
});

Garden.associate = models => {
    Garden.hasMany(models.Plot, { foreignKey: 'garden_id' });
    Garden.hasMany(models.VolunteerEvent, { foreignKey: 'garden_id' });
    Garden.hasMany(models.WeatherData, { foreignKey: 'garden_id' });
    Garden.hasMany(models.SoilData, { foreignKey: 'garden_id' });
};
module.exports = Garden;
