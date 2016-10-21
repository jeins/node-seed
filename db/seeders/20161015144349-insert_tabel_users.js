'use strict';

var faker = require('faker'),
    crypto = require('crypto'),
    moment = require('moment'),
    config = require('../../config/config.js');

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

    var _getHash = function(string){
          return crypto
              .createHmac('sha256', config.sha256.secret)
              .update(string)
              .digest('hex');
      };

    for(var i=0; i<100; i++){
        arrData.push({
            fullName: faker.name.findName(),
            email: faker.internet.email(),
            password: _getHash(faker.internet.email()),
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt:  moment().format('YYYY-MM-DD HH:mm:ss')
        });
    }

    return queryInterface.bulkInsert('users', arrData);
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
