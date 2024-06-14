'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Marvin',
        last_name: 'Cross',
        password: bcrypt.hashSync('password123', 10),
        email: 'test1@example.com',
        phone: '1234567890',
        profile_picture_url: 'https://ui-avatars.com/api/?name=Marvin+Cross',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Irene',
        last_name: 'Lucas',
        password: bcrypt.hashSync('password123', 10),
        email: 'test2@example.com',
        phone: '0987654321',
        profile_picture_url: 'https://ui-avatars.com/api/?name=Irene+Lucas',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lester',
        last_name: 'Welch',
        password: bcrypt.hashSync('password123', 10),
        email: 'test3@example.com',
        phone: '1122334455',
        profile_picture_url: 'https://ui-avatars.com/api/?name=Lester+Welch',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Admin',
        last_name: 'Admin',
        password: bcrypt.hashSync('password123', 10),
        email: 'admin@example.com',
        phone: '5432167890',
        profile_picture_url: 'https://ui-avatars.com/api/?name=Admin+Admin',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
