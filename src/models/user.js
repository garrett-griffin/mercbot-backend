const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {
    static associate(models) {
        // Define associations here, if any
    }
}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false // Add this line if you don't want Sequelize to manage createdAt and updatedAt timestamps
});

module.exports = User;
