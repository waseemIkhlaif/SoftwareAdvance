const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const WeatherData = sequelize.define('WeatherData', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    garden_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'communitygardens',
            key: 'id'
        }
    },
    date: {
        type: DataTypes.DATE
    },
    temperature: {
        type: DataTypes.DECIMAL(5, 2)
    },
    humidity: {
        type: DataTypes.DECIMAL(5, 2)
    },
    precipitation: {
        type: DataTypes.DECIMAL(5, 2)
    }
});

WeatherData.associate = models => {
    WeatherData.belongsTo(models.Garden, { foreignKey: 'garden_id' });
};

module.exports = WeatherData;
