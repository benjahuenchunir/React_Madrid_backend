'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MessageStatuses', {
      id_message: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      status: {
        type: Sequelize.ENUM("read", "delivered", "pending")
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
    await queryInterface.dropTable('MessageStatuses');
  }
};