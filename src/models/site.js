const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Site extends Model {
    static associate(models) {
        Site.hasMany(models.Season, { foreignKey: 'seasonId' });
    }

    static async getPrimarySite() {
        return await this.findOne({
            where: { 'url': 'play.mercatorio.io' },
        });
    }
}

Site.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Site',
    timestamps: false
});

module.exports = Site;