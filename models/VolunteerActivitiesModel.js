
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const VolunteerActivities = sequelize.define("Volunteer_Activities", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    event_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = VolunteerActivities;