const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SoilData = sequelize.define('SoilData', {
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
    soil_ph: {
        type: DataTypes.DECIMAL(3, 1)
    },
    nutrients: {
        type: DataTypes.TEXT
    },
    pest_info: {
        type: DataTypes.TEXT
    }
});

SoilData.associate = models => {
    SoilData.belongsTo(models.CommunityGardensModel, { foreignKey: 'garden_id' });
};

module.exports = SoilData;