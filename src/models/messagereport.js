'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MessageReport extends Model {
    static associate(models) {
      MessageReport.belongsTo(models.Message, { foreignKey: 'id_message' });
      MessageReport.belongsTo(models.User, { as: 'Reporter', foreignKey: 'id_reporter' });
    }
  
  toDomain() {
    return {
      id: this.id,
      idReporter: this.id_reporter,
      idMessage: this.id_message,
      message: this.message,
      type: this.type
    };
  }
}
  MessageReport.init({
    id_reporter: {
        type: DataTypes.INTEGER,
      },
    id_message: {
      type: DataTypes.INTEGER,
    },
    message: DataTypes.TEXT,
    type: DataTypes.ENUM("spam", "odio", "contenido inapropiado", "otros"),
  }, {
    sequelize,
    modelName: 'MessageReport',
  });
  return MessageReport;
}