'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('MessageReports', [
      {
        id_reporter: 2,
        id_message: 1,
        message: 'mal mensaje',
        type: 'spam',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_reporter: 1,
        id_message: 2,
        message: 'mal mensaje XD',
        type: 'otros',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('MessageReports', null, {});
  }
};
