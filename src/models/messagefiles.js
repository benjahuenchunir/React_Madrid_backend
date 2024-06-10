'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MessageFile extends Model {
    static associate(models) {
      MessageFile.belongsTo(models.Message, { foreignKey: 'id_message' });
    }

    toDomain() {
      return {
        id: this.id,
        idMessage: this.id_message,
        name: this.name,
        size: this.size,
        fileUrl: this.file_url,
      };
    }
  }
  MessageFile.init({
    id_message: DataTypes.INTEGER,
    name: DataTypes.STRING,
    size: DataTypes.INTEGER,
    file_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MessageFile',
  });
  return MessageFile;
};