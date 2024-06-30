'use strict';
const {
  Model
} = require('sequelize');
const { canSendMessage } = require('../utils/permissions');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      Chat.hasMany(models.Message, { foreignKey: 'id_chat' });
      Chat.hasMany(models.Member, { foreignKey: 'id_chat' });
      Chat.belongsToMany(models.User, { through: 'Member', foreignKey: 'id_chat' });
    }

    async toDomain(userId) {
      const modifiedChat = await transformChat(this, userId);
      const messages = await this.getMessages();
      const lastMessage = messages.length > 0 ? messages[0] : null;
      return {
        id: modifiedChat.id,
        name: modifiedChat.name,
        imageUrl: modifiedChat.image_url,
        canSendMessage: await canSendMessage(this, userId),
        lastMessage: lastMessage
          ? {
            message: lastMessage.message,
            time: lastMessage.createdAt
          }
          : null,
        isDm: this.mode === 'dm'
      };
    }
  }

  async function transformChat(chat, userId) {
    let modifiedChat = { ...chat.toJSON() };

    if (chat.mode === 'dm') {
      const users = await chat.getUsers()
      const otherUser = users.find(user => user.id !== userId);
      if (!otherUser) {
        // DM with himself
        const user = users.find(user => user.id === userId);
        modifiedChat.name = 'Yo';
        modifiedChat.image_url = user.profile_picture_url;
      } else {
        modifiedChat.name = `${otherUser.name} ${otherUser.last_name}`;
        modifiedChat.image_url = otherUser.profile_picture_url;
      }
    }
    return modifiedChat;
  }

  Chat.init({
    name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    mode: DataTypes.ENUM("admin-only", "everyone", "dm")
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};