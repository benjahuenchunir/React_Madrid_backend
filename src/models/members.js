'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {
      Member.belongsTo(models.Chat, { foreignKey: 'id_chat' });
      Member.belongsTo(models.User, { foreignKey: 'id_user' });
    }
  }
  Member.init({
    id_chat: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    role: DataTypes.ENUM("admin", "member", "owner")
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};