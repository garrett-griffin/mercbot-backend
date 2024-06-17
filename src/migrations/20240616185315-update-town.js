'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop foreign key constraints
    await queryInterface.removeConstraint('MarketItems', 'MarketItems_townId_fkey');

    // Drop existing table if it exists
    await queryInterface.dropTable('Towns');

    // Create the table with the new structure
    await queryInterface.createTable('Towns', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      locationX: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      locationY: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      region: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      capital: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      seasonId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Seasons',
          key: 'id'
        }
      }
    });

    // Recreate the foreign key constraint
    await queryInterface.addConstraint('MarketItems', {
      fields: ['townId'],
      type: 'foreign key',
      name: 'MarketItems_townId_Towns_fk',
      references: {
        table: 'Towns',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    // If needed, modify columns
    await queryInterface.changeColumn('Towns', 'seasonId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Seasons',
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop foreign key constraints
    await queryInterface.removeConstraint('MarketItems', 'MarketItems_townId_fk');

    // Revert changes made in the 'up' function
    await queryInterface.dropTable('Towns');

    // Optional: Add any revert changes if necessary
    // await queryInterface.createTable('Towns', {
    //   // Recreate the original table structure
    // });
  }
};
