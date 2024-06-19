// migration-<timestamp>-update-user-model.js

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users', 'role', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'user'
      }),
      queryInterface.addColumn('Users', 'firstName', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('Users', 'lastName', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn('Users', 'email', {
        type: Sequelize.STRING,
        allowNull: true
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'id'),
      queryInterface.removeColumn('Users', 'role'),
      queryInterface.removeColumn('Users', 'firstName'),
      queryInterface.removeColumn('Users', 'lastName'),
      queryInterface.removeColumn('Users', 'email')
    ]);
  }
};