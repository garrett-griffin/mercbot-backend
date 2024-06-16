'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Import all models
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Sync the database and seed initial data
const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true });

        // Seed initial data for Season if it doesn't already exist
        const [initialSeason, created] = await db.Season.findOrCreate({
            where: { seasonNumber: 1 },
            defaults: { startDate: null, endDate: null }
        });

        if (created) {
            console.log('Initial season seeded.');
        } else {
            console.log('Initial season already exists.');
        }

        console.log('Database synced and initial data seeded.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

syncDatabase().then(() => {
    console.log('Sync process completed.');
});

module.exports = db;
