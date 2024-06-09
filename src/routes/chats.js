const Router = require('koa-router');
const { Chat, User, Message } = require('../models');
const router = new Router();

function transformChat(chat, userId) {
    let modifiedChat = { ...chat.toJSON() };

    if (isDM(chat)) {
        const otherUser = modifiedChat.Users.find(user => user.id !== userId);

        modifiedChat.name = `${otherUser.name} ${otherUser.last_name}`;
        modifiedChat.image_url = otherUser.profile_picture_url;
    }

    return modifiedChat;
}

function isDM(chat) {
    return chat.Users.length === 2;
}

router.get('/', async (ctx) => {
    try {
        const userId = Number(ctx.query.userId);

        const allChats = await Chat.findAll({
            attributes: ['name', 'image_url'],
            include: [{
                model: User
            }, {
                model: Message,
                limit: 1,
                order: [['createdAt', 'DESC']]
            }]
        });

        const userChats = allChats.filter(chat =>
            chat.Users.some(user => user.id === userId)
        );

        const modifiedChats = userChats.map(chat => {
            const modifiedChat = transformChat(chat, userId);
            return {
                id: modifiedChat.id,
                name: modifiedChat.name,
                imageUrl: modifiedChat.image_url,
                lastMessage: {
                    message: modifiedChat.Messages[0].message,
                    time: modifiedChat.Messages[0].createdAt
                },
                isDm: isDM(chat)
            };
        });

        ctx.status = 200;
        ctx.body = modifiedChats;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

router.get('/:id', async (ctx) => {
    try {
        const chatId = Number(ctx.params.id);

        const chat = await Chat.findOne({
            where: { id: chatId },
            include: [{
                model: User
            }, {
                model: Message,
                order: [['createdAt', 'DESC']],
                include: [{
                    model: User,
                    attributes: ['id', 'name', 'profile_picture_url']
                }]
            }]
        });

        if (!chat) {
            ctx.status = 404;
            ctx.body = { error: 'No se encontró el chat' };
            return;
        }

        const messages = chat.Messages.map(message => ({
            id: message.id,
            message: message.message,
            time: message.createdAt,
            user: {
                id: message.User.id,
                name: message.User.name,
                profilePictureUrl: message.User.profile_picture_url
            }
        }));

        ctx.status = 200;
        ctx.body = messages;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

module.exports = router;