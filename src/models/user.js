'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Chat, { through: 'Member', foreignKey: 'id_user' });
      User.hasMany(models.Message, { foreignKey: 'id_user' });
      User.hasMany(models.MessageStatus, { foreignKey: 'id_user' });
      User.hasMany(models.MessageReport, { as: 'CreatedReport', foreignKey: 'id_reporter' });
    }

    toDomain() {
      return {
        id: this.id,
        name: this.name,
        lastName: this.last_name,
        profilePictureUrl: this.profile_picture_url
      };
    }
  }
  User.init({
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    profile_picture_url: DataTypes.STRING,
    role: DataTypes.ENUM('user', 'admin'),
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};