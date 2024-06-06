'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.Chat, { foreignKey: 'id_chat' });
      Message.belongsTo(models.User, { foreignKey: 'id_user' });
      Message.hasMany(models.Message, { foreignKey: 'responding_to' });
      Message.hasMany(models.MessageStatus, { foreignKey: 'id_message' });
      Message.hasMany(models.MessageFile, { foreignKey: 'id_message' });
    }
  }
  Message.init({
    id_chat: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    message: DataTypes.STRING,
    last_edit_date: DataTypes.DATE,
    pinned: DataTypes.BOOLEAN,
    deletes_at: DataTypes.DATE,
    forwarded: DataTypes.BOOLEAN,
    responding_to: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};