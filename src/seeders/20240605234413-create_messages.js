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
        createdAt: new Date('2022-01-01T10:00:00Z'),
        updatedAt: new Date('2022-01-01T10:00:00Z')
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
        createdAt: new Date('2022-01-01T10:03:00Z'),
        updatedAt: new Date('2022-01-01T10:03:00Z')
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
        createdAt: new Date('2022-01-01T10:04:00Z'),
        updatedAt: new Date('2022-01-01T10:04:00Z')
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
        createdAt: new Date('2024-01-01T10:00:00Z'),
        updatedAt: new Date('2024-01-01T10:00:00Z')
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
        createdAt: new Date('2024-01-01T10:02:00Z'),
        updatedAt: new Date('2024-01-01T10:02:00Z')
      },
      {
        id_chat: 2,
        id_user: 3,
        message: 'Primer día del evento!!! Esta noche tendremos una cena de bienvenida. ¡No falten!',
        last_edit_date: null,
        pinned: false,
        deletes_at: null,
        forwarded: false,
        responding_to: null,
        createdAt: new Date('2024-01-05T10:27:00Z'),
        updatedAt: new Date('2024-01-05T10:27:00Z')
      },
      {
        id_chat: 2,
        id_user: 3,
        message: 'Ya esta disponible la grabación de la conferencia de hoy. Pueden verla en el siguiente enlace: https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        last_edit_date: null,
        pinned: false,
        deletes_at: null,
        forwarded: false,
        responding_to: null,
        createdAt: new Date('2024-01-05T20:02:00Z'),
        updatedAt: new Date('2024-01-05T20:02:00Z')
      },
      {
        id_chat: 2,
        id_user: 3,
        message: 'Segundo día del evento!!! Hoy tendremos una conferencia sobre el impacto de la IA en la sociedad. ¡No falten!',
        last_edit_date: null,
        pinned: false,
        deletes_at: null,
        forwarded: false,
        responding_to: null,
        createdAt: new Date('2024-02-05T09:00:00Z'),
        updatedAt: new Date('2024-02-05T09:00:00Z')
      },
      {
        id_chat: 2,
        id_user: 3,
        message: 'Estamos muy felices con el resultado del evento. Gracias a todos por asistir. Los esperamos en el próximo evento.',
        last_edit_date: null,
        pinned: false,
        deletes_at: null,
        forwarded: false,
        responding_to: null,
        createdAt: new Date('2024-02-05T20:02:00Z'),
        updatedAt: new Date('2024-02-05T20:02:00Z')
      },
      {
        id_chat: 3,
        id_user: 1,
        message: 'TODOs: \n- [x] Implementar mensajes pinneados \n- [ ] Implementar reenviar \n- [ ] Implementar nuevos chats \n- [ ] Implementar reacciones',
        last_edit_date: null,
        pinned: true,
        deletes_at: null,
        forwarded: false,
        responding_to: null,
        createdAt: new Date('2024-01-01T20:02:00Z'),
        updatedAt: new Date('2024-01-01T20:02:00Z')
      },
      {
        id_chat: 3,
        id_user: 1,
        message: '¿Alguien sabe si el profesor va a revisar la tarea de hoy?',
        last_edit_date: null,
        pinned: false,
        deletes_at: null,
        forwarded: false,
        responding_to: null,
        createdAt: new Date('2024-01-05T20:02:00Z'),
        updatedAt: new Date('2024-01-05T20:02:00Z')
      },
      {
        id_chat: 3,
        id_user: 2,
        message: 'No lo sé, pero si revisa la tarea, me gustaría saber si la resolviste.',
        last_edit_date: null,
        pinned: false,
        deletes_at: null,
        forwarded: false,
        responding_to: null,
        createdAt: new Date('2024-01-05T20:07:00Z'),
        updatedAt: new Date('2024-01-05T20:07:00Z')
      },
      {
        id_chat: 3,
        id_user: 1,
        message: 'Sí, la resolví. Aca debería estar todo.',
        last_edit_date: null,
        pinned: false,
        deletes_at: null,
        forwarded: false,
        responding_to: null,
        createdAt: new Date('2024-01-05T20:15:00Z'),
        updatedAt: new Date('2024-01-05T20:15:00Z')
      },
      {
        id_chat: 3,
        id_user: 3,
        message: 'A mi me salió distinta la 4',
        last_edit_date: null,
        pinned: false,
        deletes_at: null,
        forwarded: false,
        responding_to: 13,
        createdAt: new Date('2024-01-05T20:22:00Z'),
        updatedAt: new Date('2024-01-05T20:22:00Z')
      },
      {
        id_chat: 3,
        id_user: 1,
        message: 'Tareas: \n- Mathi hace la 1 \n- Seba va a hacer el video \n- Yo presento \n- Pipe no hace nada (broma)',
        last_edit_date: null,
        pinned: true,
        deletes_at: null,
        forwarded: false,
        responding_to: null,
        createdAt: new Date('2024-01-05T23:22:00Z'),
        updatedAt: new Date('2024-01-05T23:22:00Z')
      },
      {
        id_chat: 3,
        id_user: 3,
        message: 'Cuando podrían juntarse para revisar la tarea?',
        last_edit_date: null,
        pinned: false,
        deletes_at: null,
        forwarded: false,
        responding_to: null,
        createdAt: new Date('2024-01-06T20:22:00Z'),
        updatedAt: new Date('2024-01-06T20:22:00Z')
      },
      {
        id_chat: 3,
        id_user: 2,
        message: 'Te tinca mañana a las 3?',
        last_edit_date: null,
        pinned: false,
        deletes_at: null,
        forwarded: false,
        responding_to: null,
        createdAt: new Date('2024-01-06T23:22:00Z'),
        updatedAt: new Date('2024-01-06T23:22:00Z')
      },
      {
        id_chat: 3,
        id_user: 2,
        message: 'Mejor a las 4, que me pidieron unas cosas',
        last_edit_date: null,
        pinned: false,
        deletes_at: null,
        forwarded: false,
        responding_to: null,
        createdAt: new Date('2024-01-06T23:30:00Z'),
        updatedAt: new Date('2024-01-06T23:30:00Z')
      },
      {
        id_chat: 3,
        id_user: 3,
        message: 'Me parece',
        last_edit_date: null,
        pinned: false,
        deletes_at: null,
        forwarded: false,
        responding_to: null,
        createdAt: new Date('2024-01-06T23:35:00Z'),
        updatedAt: new Date('2024-01-06T23:35:00Z')
      },
      {
        id_chat: 3,
        id_user: 1,
        message: 'A las 4 entonces',
        last_edit_date: null,
        pinned: false,
        deletes_at: null,
        forwarded: false,
        responding_to: null,
        createdAt: new Date('2024-01-06T23:37:00Z'),
        updatedAt: new Date('2024-01-06T23:37:00Z')
      },
    ]);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('Messages', null, {});
  }
};