'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('GameAccounts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      apiUser: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apiToken: {
        type: Sequelize.STRING,
        allowNull: false
      },
      seasonId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Seasons',
          key: 'id'
        },
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('GameAccounts');
  }
};
