'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
    
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