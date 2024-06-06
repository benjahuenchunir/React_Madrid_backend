'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('Chats', [
      {
        name: 'General',
        image_url: 'https://ui-avatars.com/api/?name=General',
        mode: 'everyone',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Admin',
        image_url: 'https://ui-avatars.com/api/?name=Admin',
        mode: 'admin-only',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('Chats', null, {});
  }
};
