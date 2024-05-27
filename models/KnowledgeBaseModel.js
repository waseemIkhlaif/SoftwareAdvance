const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const KnowledgeBase = sequelize.define('KnowledgeBase', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    author_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
});

KnowledgeBase.associate = models => {
    KnowledgeBase.belongsTo(models.User, { foreignKey: 'author_id' });
};

module.exports = KnowledgeBase;