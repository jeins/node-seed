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

    for(var i=0; i<1000; i++){
      var amount = Math.floor(Math.random() * 10) + 1;

      arrData.push({
        userId: Math.floor(Math.random() * 100) + 1,
        productId: Math.floor(Math.random() * 100) + 1,
        amount: amount,
        totalPrice: amount * faker.commerce.price(),
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt:  moment().format('YYYY-MM-DD HH:mm:ss')
      });
    }

    return queryInterface.bulkInsert('purchases', arrData);
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
