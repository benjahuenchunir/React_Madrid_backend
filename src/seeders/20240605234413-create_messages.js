'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('Messages', [
      {
        id_chat: 1,
        id_user: 1,
        message: 'Hola, ¿cómo estás?',
        last_edit_date: null,
        pinned: false,
        deletes_at: null,
        forwarded: false,
        responding_to: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_chat: 1,
        id_user: 2,
        message: 'Estoy bien, gracias. ¿Y tú?',
        last_edit_date: null,
        pinned: false,
        deletes_at: null,
        forwarded: false,
        responding_to: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_chat: 1,
        id_user: 1,
        message: 'Estoy cansado, tuve que escuchar 8 podcasts para IA.',
        last_edit_date: null,
        pinned: false,
        deletes_at: null,
        forwarded: false,
        responding_to: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_chat: 2,
        id_user: 3,
        message: 'Buenos días a todos. Recuerden que el evento se realizará el próximo viernes. Acá esta toda la información',
        last_edit_date: null,
        pinned: true,
        deletes_at: null,
        forwarded: false,
        responding_to: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_chat: 2,
        id_user: 3,
        message: 'También les recuerdo que deben llevar una identificación oficial para poder ingresar al evento.',
        last_edit_date: null,
        pinned: false,
        deletes_at: null,
        forwarded: false,
        responding_to: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('Messages', null, {});
  }
};