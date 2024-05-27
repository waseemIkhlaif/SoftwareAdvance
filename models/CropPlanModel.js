const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CropPlan = sequelize.define('CropPlan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    plot_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Plots',
            key: 'id'
        }
    },
    crop_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Crops',
            key: 'id'
        }
    },
    planting_date: {
        type: DataTypes.DATE
    },
    harvest_date: {
        type: DataTypes.DATE
    }
});

CropPlan.associate = models => {
    CropPlan.belongsTo(models.User, { foreignKey: 'user_id' });
    CropPlan.belongsTo(models.Plot, { foreignKey: 'plot_id' });
    CropPlan.belongsTo(models.Crop, { foreignKey: 'crop_id' });
};

module.exports = CropPlan;
