'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('Members', [
      {
        id_chat: 1,
        id_user: 1,
        role: 'owner',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_chat: 1,
        id_user: 2,
        role: 'owner',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_chat: 2,
        id_user: 3,
        role: 'owner',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_chat: 2,
        id_user: 2,
        role: 'member',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_chat: 2,
        id_user: 1,
        role: 'member',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_chat: 3,
        id_user: 3,
        role: 'owner',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_chat: 3,
        id_user: 1,
        role: 'member',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_chat: 3,
        id_user: 2,
        role: 'member',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('Members', null, {});
  }
};
