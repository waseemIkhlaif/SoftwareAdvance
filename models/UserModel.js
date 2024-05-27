const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// User.associate = models => {
//     User.belongsToMany(models.Role, { through: models.UserRole, foreignKey: 'user_id' });
//     User.hasMany(models.CropPlan, { foreignKey: 'user_id' });
//     User.hasMany(models.Resource, { foreignKey: 'owner_id' });
//     User.hasMany(models.Volunteer, { foreignKey: 'user_id' });
//     User.hasMany(models.KnowledgeBase, { foreignKey: 'author_id' });
//     User.hasMany(models.Log, { foreignKey: 'user_id' });
// };

module.exports = User;
