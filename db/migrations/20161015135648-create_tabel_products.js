'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.createTable(
        'products',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            product: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.DOUBLE
            },
            updatedAt: {
                type: Sequelize.DATE
            },
            createdAt: {
                type: Sequelize.DATE
            }
        }
    );
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
