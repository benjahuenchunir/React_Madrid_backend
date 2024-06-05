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
    id_message: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    status: DataTypes.ENUM("read", "delivered", "pending")
  }, {
    sequelize,
    modelName: 'MessageStatus',
  });
  return MessageStatus;
};