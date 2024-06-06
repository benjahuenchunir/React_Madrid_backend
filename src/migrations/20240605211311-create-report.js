'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reports', {
      id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      id_reporter: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      message: {
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.ENUM("spam", "harassment", "other", "inappropriate picture")
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
    await queryInterface.dropTable('Reports');
  }
};