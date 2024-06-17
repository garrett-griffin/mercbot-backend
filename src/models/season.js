const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Season extends Model {
    static associate(models) {
        Season.hasMany(models.Turn, { foreignKey: 'seasonId' });
    }

    static async getCurrentSeason() {
        return await this.findOne({
            order: [['seasonNumber', 'DESC']]
        });
    }
}

Season.init({
    seasonNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Season',
    timestamps: false
});

module.exports = Season;
