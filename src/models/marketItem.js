const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class MarketItem extends Model {
    static associate(models) {
        MarketItem.belongsTo(models.Town, { foreignKey: 'townId' });
        MarketItem.belongsTo(models.Turn, { foreignKey: 'turnId' });
    }
}

MarketItem.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    volume: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    townId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Towns',
            key: 'id'
        },
        allowNull: false
    },
    turnId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Turns',
            key: 'id'
        },
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'MarketItem',
    timestamps: false
});

module.exports = MarketItem;
