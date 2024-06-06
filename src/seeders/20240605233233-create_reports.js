'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Reports', [
      {
        id_user: 1,
        id_reporter: 2,
        message: 'El usuario esta spammeando el chat',
        type: 'spam',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_user: 3,
        id_reporter: 1,
        message: 'El usuario tiene una foto inapropiada',
        type: 'inappropriate picture',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Reports', null, {});
  }
};
