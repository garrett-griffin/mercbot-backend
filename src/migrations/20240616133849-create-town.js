'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Towns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location: {
        type: Sequelize.JSON,
        allowNull: true
      },
      region: {
        type: Sequelize.STRING,
        allowNull: true
      },
      capital: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      center_ids: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true
      },
      outposts: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true
      },
      domain: {
        type: Sequelize.JSON,
        allowNull: true
      },
      household_ids: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true
      },
      commoners: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      government: {
        type: Sequelize.STRING,
        allowNull: true
      },
      church: {
        type: Sequelize.STRING,
        allowNull: true
      },
      navigation_zones: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      },
      special_markets: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      },
      culture: {
        type: Sequelize.STRING,
        allowNull: true
      },
      population: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      economy: {
        type: Sequelize.JSON,
        allowNull: true
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Towns');
  }
};
