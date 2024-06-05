'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MessageFiles extends Model {
    static associate(models) {
      MessageFiles.belongsTo(models.Message, { foreignKey: 'id_message' });
    }
  }
  MessageFiles.init({
    id_message: DataTypes.INTEGER,
    file_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MessageFiles',
  });
  return MessageFiles;
};