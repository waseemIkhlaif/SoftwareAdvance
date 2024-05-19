
module.exports = (Sequelize, DataTypes) => {
    const CG = Sequelize.define("Community_Garden", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sunlight_conditions: {
            type: DataTypes.STRING,
            allowNull: false
        },
        soil_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        available_plots: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
}