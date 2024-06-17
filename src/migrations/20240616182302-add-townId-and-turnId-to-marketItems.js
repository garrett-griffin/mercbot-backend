'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('MarketItems', 'turnId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Turns',
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('MarketItems', 'townId');
    await queryInterface.removeColumn('MarketItems', 'turnId');
  }
};
