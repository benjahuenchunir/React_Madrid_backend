'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('MessageFiles', [
      {
        id_message: 4,
        name: 'info.pdf',
        size: 2048,
        file_url: 'https://res.cloudinary.com/dmfsapvzv/image/upload/v1718031326/efbor2ydmljlasfj2dkr.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_message: 13,
        name: 'tarea.pdf',
        size: 1024,
        file_url: 'https://res.cloudinary.com/dmfsapvzv/image/upload/v1718031326/efbor2ydmljlasfj2dkr.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('MessageFiles', null, {});
  }
};
