const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class GameAccount extends Model {
    static associate(models) {
        GameAccount.belongsTo(models.Season, { foreignKey: 'seasonId' });
        GameAccount.belongsTo(models.User, { foreignKey: 'userId' });
    }
}

GameAccount.init({
    apiUser: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apiToken: {
        type: DataTypes.STRING,
        allowNull: false
    },
    seasonId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Seasons',
            key: 'id'
        },
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'GameAccount',
    timestamps: false
});

module.exports = GameAccount;
