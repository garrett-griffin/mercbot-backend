const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {
    static associate(models) {
        // Define associations here, if any
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false // Add this line if you don't want Sequelize to manage createdAt and updatedAt timestamps
});

module.exports = User;
