'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      Chat.hasMany(models.Members, { foreignKey: 'id_chat' });
      Chat.hasMany(models.Messages, { foreignKey: 'id_chat' });
    }
  }
  Chat.init({
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    created_at: DataTypes.DATE,
    image_url: DataTypes.STRING,
    mode: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};