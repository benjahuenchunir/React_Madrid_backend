'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Members', {
      id_chat: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        references: {
          model: 'Chats',
          key: 'id'
        }
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      role: {
        type: Sequelize.ENUM("admin", "member", "owner"),
        allowNull: false,
        defaultValue: "member"
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
    await queryInterface.dropTable('Members');
  }
};
