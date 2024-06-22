const { Chat, Member } = require('../models');
const jwt = require('jsonwebtoken');

async function canSendMessage(idUser, idChat) {
    const chat = await Chat.findOne({ where: { id: idChat } });
    const member = await Member.findOne({ where: { id_chat: idChat, id_user: idUser } });
    if (!member || (chat.mode !== 'everyone' && member.role === 'member')) {
        return false;
    }
    return true;
}

function getTokenFromHeader(ctx) {
    const authHeader = ctx.request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('No token provided');
    }
    return authHeader.split(' ')[1];
}

function getTokenFromParam(ctx) {
    const token = ctx.query.token;
    if (!token) {
        throw new Error('No token provided');
    }
    return token;
}

function getUserIdFromToken(ctx, tokenGetter = getTokenFromHeader) {
    const token = tokenGetter(ctx);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return Number(decoded.sub);
    } catch (error) {
        throw new Error('Invalid token');
    }
}

module.exports = { canSendMessage, getUserIdFromToken, getTokenFromParam };