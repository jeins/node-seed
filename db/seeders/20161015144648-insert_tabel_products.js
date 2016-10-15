'use strict';

var faker = require('faker'),
    moment = require('moment');

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    var arrData = [];

    for(var i=0; i<100; i++){
      arrData.push({
        product: faker.commerce.product(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt:  moment().format('YYYY-MM-DD HH:mm:ss')
      });
    }

    return queryInterface.bulkInsert('products', arrData);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
