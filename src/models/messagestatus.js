'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MessageStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MessageStatus.init({
    id_message: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    status: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'MessageStatus',
  });
  return MessageStatus;
};