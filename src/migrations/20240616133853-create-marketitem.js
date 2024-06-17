// 20230616120100-create-marketitem.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MarketItems', {
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
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      volume: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      townId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Towns',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MarketItems');
  }
};
