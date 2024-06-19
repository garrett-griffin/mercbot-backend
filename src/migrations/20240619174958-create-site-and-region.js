module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('Sites', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        url: {
          type: Sequelize.STRING,
          allowNull: true
        }
      }),
      queryInterface.createTable('Regions', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true
        },
        seasonId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Seasons',
            key: 'id'
          }
        }
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('Sites'),
      queryInterface.dropTable('Regions')
    ]);
  }
};