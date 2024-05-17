
module.exports = (Sequelize, DataTypes) => {
    const KnowledgeBase = Sequelize.define("Knowledge_Base", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
}