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
      },
      {
        id_reporter: 3,
        id_message: 3,
        message: 'contenido inapropiado',
        type: 'contenido inapropiado',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_reporter: 1,
        id_message: 4,
        message: 'mensaje de odio',
        type: 'odio',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_reporter: 2,
        id_message: 5,
        message: 'lenguaje ofensivo',
        type: 'contenido inapropiado',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_reporter: 3,
        id_message: 6,
        message: 'spam repetitivo',
        type: 'spam',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_reporter: 1,
        id_message: 7,
        message: 'contenido irrelevante',
        type: 'otros',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_reporter: 2,
        id_message: 8,
        message: 'mensaje duplicado',
        type: 'spam',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_reporter: 3,
        id_message: 9,
        message: 'información inapropiada',
        type: 'contenido inapropiado',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_reporter: 1,
        id_message: 10,
        message: 'comentario ofensivo',
        type: 'contenido inapropiado',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_reporter: 2,
        id_message: 11,
        message: 'spam',
        type: 'spam',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('MessageReports', null, {});
  }
};
