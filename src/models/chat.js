'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      Chat.hasMany(models.Message, { foreignKey: 'id_chat' });
    }
  }
  Chat.init({
    name: DataTypes.STRING,
    created_at: DataTypes.DATE,
    image_url: DataTypes.STRING,
    mode: DataTypes.ENUM("admin-only", "everyone")
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};