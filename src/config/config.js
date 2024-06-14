require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DATABASE_URL,
        dialect: process.env.DB_DIALECT || 'postgres',
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DATABASE_URL,
        dialect: process.env.DB_DIALECT || 'postgres',
    },
    production: {
        use_environment_variable: "DATABASE_URL",
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
};
