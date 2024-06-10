const { Chat, Member } = require('../models');

async function canSendMessage(idUser, idChat) {
    const chat = await Chat.findOne({ where: { id: idChat } });
    const member = await Member.findOne({ where: { id_chat: idChat, id_user: idUser } });
    console.log(chat.mode)
    console.log(member)
    if (!member || (chat.mode !== 'everyone' && member.role === 'member')) {
        return false;
    }
    console.log("tiene permisos")

    return true;
}

module.exports = canSendMessage;