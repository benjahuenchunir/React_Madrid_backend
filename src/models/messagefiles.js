'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MessageFile extends Model {
    static associate(models) {
      MessageFile.belongsTo(models.Message, { foreignKey: 'id_message' });
    }
  }
  MessageFile.init({
    id_message: DataTypes.INTEGER,
    file_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MessageFile',
  });
  return MessageFile;
};