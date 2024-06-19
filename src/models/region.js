const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Region extends Model {
    static associate(models) {
        Region.belongsTo(models.Season, { foreignKey: 'seasonId' });
        Region.hasMany(models.Town, { foreignKey: 'regionId' });
    }
}

Region.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
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
    modelName: 'Region',
    timestamps: false
});

module.exports = Region;