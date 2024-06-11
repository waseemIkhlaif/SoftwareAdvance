const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Volunteer = sequelize.define('Volunteer', {
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
    availability: {
        type: DataTypes.TEXT
    },
    skills: {
        type: DataTypes.TEXT
    }
});

Volunteer.associate = models => {
    Volunteer.belongsTo(models.User, { foreignKey: 'user_id' });
};

module.exports = Volunteer;