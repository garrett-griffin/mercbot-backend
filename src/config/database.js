require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { Sequelize } = require('sequelize');

const databaseConfig = require('./config')[process.env.NODE_ENV || 'development'];

let sequelize;
if (databaseConfig.use_env_variable) {
    sequelize = new Sequelize(process.env[databaseConfig.use_env_variable], databaseConfig);
} else {
    sequelize = new Sequelize(
        databaseConfig.database,
        databaseConfig.username,
        databaseConfig.password,
        {
            host: databaseConfig.host,
            dialect: databaseConfig.dialect,
            dialectOptions: databaseConfig.dialectOptions,
            logging: false,  // Set to true if you want to see the SQL queries
        }
    );
}

module.exports = sequelize;
