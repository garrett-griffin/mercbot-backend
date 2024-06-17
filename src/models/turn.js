const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Turn extends Model {
    static associate(models) {
        Turn.belongsTo(models.Season, { foreignKey: 'seasonId' });
    }

    static async getCurrentTurn() {
        return await this.findOne({
            order: [
                ['seasonId', 'DESC'],
                ['turnNumber', 'DESC']
            ]
        });
    }
}

// Array to map turn numbers to months
const months = [
    "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December", "January"
];

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
    timestamps: false,
    hooks: {
        beforeSave: (turn, options) => {
            const turnNumber = turn.turnNumber;
            const monthIndex = (turnNumber - 1) % 12;
            const year = Math.floor((turnNumber - 2) / 12) + 1; // Start from Year 1
            turn.month = months[monthIndex];
            turn.year = year;
        }
    }
});

module.exports = Turn;
