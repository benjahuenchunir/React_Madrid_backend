'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    static associate(models) {
      Report.belongsTo(models.User, { as: 'User', foreignKey: 'id_user' });
      Report.belongsTo(models.User, { as: 'Reporter', foreignKey: 'id_reporter' });
    }
  }
  Report.init({
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_reporter: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    message: DataTypes.TEXT,
    type: DataTypes.ENUM("spam", "harassment", "other", "inappropriate picture"),
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};