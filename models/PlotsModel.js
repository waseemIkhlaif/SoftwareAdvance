const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Plot = sequelize.define('Plot', {
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
    plot_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.DECIMAL(10, 2)
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

Plot.associate = models => {
    Plot.belongsTo(models.CommunityGarden, { foreignKey: 'garden_id' });
    Plot.hasMany(models.CropPlan, { foreignKey: 'plot_id' });
};

module.exports = Plot;