const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { Site } = require('../models');

class Season extends Model {
    static associate(models) {
        Season.hasMany(models.Turn, { foreignKey: 'seasonId' });
        Season.belongsTo(models.Site, { foreignKey: 'siteId' });
    }

    static async getCurrentSeason() {
        const site = await Site.getPrimarySite();
        return await this.findOne({
            where: { siteId: site.id },
            order: [['seasonNumber', 'DESC']]
        });
    }

    static async getCurrentSeasonForSite(siteId) {
        const site = await Site.findOne({
            where: { id: siteId }
        });
        return await this.findOne({
            where: { siteId: site.id },
            order: [['seasonNumber', 'DESC']]
        });
    }
}

Season.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    seasonNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    siteId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Site',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Season',
    timestamps: false
});

module.exports = Season;
