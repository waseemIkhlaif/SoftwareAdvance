const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Resource = sequelize.define('Resource', {
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
    description: {
        type: DataTypes.TEXT
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    owner_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
});

Resource.associate = models => {
    Resource.belongsTo(models.User, { foreignKey: 'owner_id' });
    Resource.hasMany(models.ResourceExchange, { foreignKey: 'resource_id' });
};

module.exports = Resource;