const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Turn extends Model {
    static associate(models) {
        Turn.belongsTo(models.Season, { foreignKey: 'seasonId' });
    }
}

// Array to map turn numbers to months
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
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
            const year = Math.floor((turnNumber - 1) / 12) + 1;
            turn.month = months[monthIndex];
            turn.year = year;
        }
    }
});

module.exports = Turn;
