'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('MessageFiles', [
      {
        id_message: 4,
        file_url: 'https://example.com/file1.pdf',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('MessageFiles', null, {});
  }
};
