'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Seasons', 'siteId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sites',
          key: 'id'
        }
      }),
      queryInterface.addColumn('Towns', 'regionId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Regions',
          key: 'id'
        }
      })
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Seasons', 'siteId'),
      queryInterface.removeColumn('Towns', 'regionId'),
    ]);
  }
};
