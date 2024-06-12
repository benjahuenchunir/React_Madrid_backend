'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.Chat, { foreignKey: 'id_chat' });
      Message.belongsTo(models.User, { foreignKey: 'id_user' });
      Message.hasMany(models.Message, { foreignKey: 'responding_to' });
      Message.hasMany(models.MessageStatus, { foreignKey: 'id_message' });
      Message.hasMany(models.MessageFile, { foreignKey: 'id_message' });
    }

    toDomain() {
      return {
        id: this.id,
        idChat: this.id_chat,
        idUser: this.id_user,
        message: this.message,
        lastEditDate: this.last_edit_date,
        pinned: this.pinned,
        deletesAt: this.deletes_at,
        forwarded: this.forwarded,
        respondingTo: this.responding_to,
        time: this.createdAt,
      };
    }

    async getFullMessage() {
      const user = await this.getUser({ attributes: ['id', 'name', 'profile_picture_url'] });
      const messageFiles = await this.getMessageFiles();
      return { ...this.toDomain(), user: user.toDomain(), files: messageFiles.map(file => file.toDomain()) };
    }
  }

  Message.init({
    id_chat: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    message: DataTypes.STRING,
    last_edit_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    pinned: DataTypes.BOOLEAN,
    deletes_at: DataTypes.DATE,
    forwarded: DataTypes.BOOLEAN,
    responding_to: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};