'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Members extends Model {
    static associate(models) {
      Members.belongsTo(models.Chat, { foreignKey: 'id_chat' });
      Members.belongsTo(models.User, { foreignKey: 'id_user' });
    }
  }
  Members.init({
    id_chat: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    role: DataTypes.ENUM("admin", "member", "owner")
  }, {
    sequelize,
    modelName: 'Members',
  });
  return Members;
};