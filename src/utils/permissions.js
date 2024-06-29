
async function canSendMessage(chat, idUser) {
    const members = await chat.getMembers()
    const member = members.find(member => member.id_user === idUser);
    if (!member || (chat.mode !== 'everyone' && member.role === 'member')) {
      return false;
    }
    return true;
}

module.exports = { canSendMessage };