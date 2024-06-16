const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Turn extends Model {
    static associate(models) {
        Turn.belongsTo(models.Season, { foreignKey: 'seasonId' });
    }
}

Turn.init({
    turnNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    month: {
        type: DataTypes.STRING,
        allowNull: true // Allow null values
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: true // Allow null values
    },
    seasonId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Seasons', // Use table name here
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Turn',
    timestamps: false
});

module.exports = Turn;
