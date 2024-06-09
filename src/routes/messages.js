const Router = require('koa-router');
const { Message, Member, MessageStatus, User } = require('../models');
const router = new Router();

router.post('/', async (ctx) => {
    try {
        const { idUser, idChat, message, pinned, deletesAt, forwarded, respondingTo } = ctx.request.body;

        if (!idUser || !idChat || !message) {
            ctx.status = 400;
            ctx.body = { error: 'Se requiere idUser, idChat y message' };
            return;
        }

        const newMessage = await Message.create({
            id_chat: idChat,
            id_user: idUser,
            message: message,
            pinned: pinned || false,
            deletes_at: deletesAt || null,
            forwarded: forwarded || false,
            responding_to: respondingTo || null
        });

        const user = await User.findOne({ where: { id: idUser }, attributes: ['id', 'name', 'profile_picture_url'] });

        const members = await Member.findAll({ where: { id_chat: idChat } });

        const messageStatuses = await Promise.all(
            members
                .filter(member => member.id_user !== idUser)
                .map(member => MessageStatus.create({
                    id_user: member.id_user,
                    id_message: newMessage.id
                }))
        ); // TODO send statuses

        const { createdAt: time, ...messageData } = newMessage.toJSON();

        ctx.status = 201;
        ctx.body = { ...messageData, time, user };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

module.exports = router;