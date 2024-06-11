const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Log = sequelize.define('Log', {
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
    action: {
        type: DataTypes.STRING,
        allowNull: false
    },
    log_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

Log.associate = models => {
    Log.belongsTo(models.User, { foreignKey: 'user_id' });
};

module.exports = Log;