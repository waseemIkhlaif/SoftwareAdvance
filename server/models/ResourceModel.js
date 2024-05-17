
module.exports = (Sequelize, DataTypes) => {
    const Resources = Sequelize.define("Resource", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        availability_status: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
}