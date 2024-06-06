'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_chat: {
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.STRING
      },
      last_edit_date: {
        type: Sequelize.DATE
      },
      pinned: {
        type: Sequelize.BOOLEAN
      },
      deletes_at: {
        type: Sequelize.DATE
      },
      forwarded: {
        type: Sequelize.BOOLEAN
      },
      responding_to: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Messages');
  }
};
