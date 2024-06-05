'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reports extends Model {
    static associate(models) {

    }
  }
  Reports.init({
    id_user: DataTypes.INTEGER,
    id_reporter: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    type: DataTypes.ENUM,
  }, {
    sequelize,
    modelName: 'Reports',
  });
  return Reports;
};