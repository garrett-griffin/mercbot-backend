const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Town extends Model {
    static associate(models) {
        Town.belongsTo(models.Region, { foreignKey: 'regionId' });
        Town.belongsTo(models.Season, { foreignKey: 'seasonId' });
        Town.hasMany(models.MarketItem, { foreignKey: 'townId' });
    }
}

Town.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    locationX: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    locationY: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    regionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Region',
            key: 'id'
        }
    },
    region: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    capital: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    seasonId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Seasons',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Town',
    timestamps: false
});

module.exports = Town;