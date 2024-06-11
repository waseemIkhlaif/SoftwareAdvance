const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

Role.associate = models => {
    Role.belongsToMany(models.User, { through: models.UserRole, foreignKey: 'role_id' });
};

module.exports = Role;
