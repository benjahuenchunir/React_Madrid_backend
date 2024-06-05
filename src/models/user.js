'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      
    }
  }
  User.init({
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    profile_picture_url: DataTypes.STRING,
    role: DataTypes.ENUM,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

