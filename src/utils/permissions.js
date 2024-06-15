const { Chat, Member } = require('../models');

async function canSendMessage(idUser, idChat) {
    const chat = await Chat.findOne({ where: { id: idChat } });
    const member = await Member.findOne({ where: { id_chat: idChat, id_user: idUser } });
    if (!member || (chat.mode !== 'everyone' && member.role === 'member')) {
        return false;
    }

    return true;
}

module.exports = canSendMessage;