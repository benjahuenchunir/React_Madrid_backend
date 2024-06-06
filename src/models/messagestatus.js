'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MessageStatus extends Model {
    static associate(models) {
      MessageStatus.belongsTo(models.Message, { foreignKey: 'id_message' });
      MessageStatus.belongsTo(models.User, { foreignKey: 'id_user' });
    }
  }
  MessageStatus.init({
    id_message: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    status: DataTypes.ENUM("read", "delivered", "pending")
  }, {
    sequelize,
    modelName: 'MessageStatus',
  });
  return MessageStatus;
};