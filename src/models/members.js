'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Members extends Model {
    static associate(models) {
    
    }
  }
  Members.init({
    id_chat: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    role: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'Members',
  });
  return Members;
};