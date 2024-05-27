const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const VolunteerEvent = sequelize.define('VolunteerEvent', {
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
    event_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    event_date: {
        type: DataTypes.DATE
    },
    description: {
        type: DataTypes.TEXT
    }
});

VolunteerEvent.associate = models => {
    VolunteerEvent.belongsTo(models.Garden, { foreignKey: 'garden_id' });
};

module.exports = VolunteerEvent;
