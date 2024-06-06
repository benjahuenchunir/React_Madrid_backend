'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('MessageStatuses', [
      {
        id_message: 1,
        id_user: 2,
        status: 'read',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_message: 2,
        id_user: 1,
        status: 'read',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_message: 3,
        id_user: 2,
        status: 'delivered',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_message: 4,
        id_user: 1,
        status: 'read',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_message: 4,
        id_user: 2,
        status: 'read',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_message: 5,
        id_user: 1,
        status: 'delivered',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_message: 5,
        id_user: 2,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('MessageStatuses', null, {});
  }
};