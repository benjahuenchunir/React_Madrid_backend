'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
    }
  }
  Message.init({
    id: DataTypes.INTEGER,
    id_chat: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    message: DataTypes.STRING,
    last_edit_date: DataTypes.DATE,
    pinned: DataTypes.BOOLEAN,
    deletes_at: DataTypes.DATE,
    forwaded: DataTypes.BOOLEAN,
    responding_to: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};