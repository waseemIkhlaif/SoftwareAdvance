const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ResourceExchange = sequelize.define('ResourceExchange', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    resource_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Resources',
            key: 'id'
        }
    },
    from_user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    to_user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    exchange_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

ResourceExchange.associate = models => {
    ResourceExchange.belongsTo(models.Resource, { foreignKey: 'resource_id' });
    ResourceExchange.belongsTo(models.User, { as: 'fromUser', foreignKey: 'from_user_id' });
    ResourceExchange.belongsTo(models.User, { as: 'toUser', foreignKey: 'to_user_id' });
};

module.exports = ResourceExchange;