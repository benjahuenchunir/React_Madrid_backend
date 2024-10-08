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
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Chats',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      message: {
        type: Sequelize.TEXT
      },
      last_edit_date: {
        type: Sequelize.DATE
      },
      pinned: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      deletes_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      forwarded: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
