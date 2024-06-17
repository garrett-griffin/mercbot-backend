'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Towns', 'seasonId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Seasons',
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Towns', 'seasonId');
  }
};
