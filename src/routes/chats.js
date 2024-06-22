const Router = require('koa-router');
const { Chat, User, Message, MessageFile } = require('../models');
const router = new Router();
const { canSendMessage } = require('../utils/permissions');

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
            attributes: ['name', 'image_url', 'mode'],
            include: [{
                model: User
            }, {
                model: Message,
                order: [['id', 'DESC']],
                limit: 1,
            }]
        });

        const userChats = allChats.filter(chat =>
            chat.Users.some(user => user.id === userId)
        );

        const modifiedChats = await Promise.all(userChats.map(async chat => {
            const modifiedChat = transformChat(chat, userId);
            const lastMessage = modifiedChat.Messages[0];
            return {
                id: modifiedChat.id,
                name: modifiedChat.name,
                imageUrl: modifiedChat.image_url,
                canSendMessage: await canSendMessage(userId, modifiedChat.id),
                lastMessage: lastMessage
                    ? {
                        message: lastMessage.message,
                        time: lastMessage.createdAt
                      }
                    : null,
                isDm: isDM(chat)
            };
        }));

        ctx.status = 200;
        ctx.body = modifiedChats;
    } catch (error) {
        console.log(error);
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
                include: [{
                    model: User,
                    attributes: ['id', 'name', 'profile_picture_url']
                }, {
                    model: MessageFile
                }]
            }],
            order: [[Message, 'createdAt', 'ASC']]
        });

        if (!chat) {
            ctx.status = 404;
            ctx.body = { error: 'No se encontró el chat' };
            return;
        }


        const messages = await Promise.all(chat.Messages.map(message => message.getFullMessage()));

        ctx.status = 200;
        ctx.body = messages;
    } catch (error) {
        console.log(error);
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

router.post('/', async (ctx) => {
    try {
        const newChat = await Chat.create(ctx.request.body);
        ctx.status = 201;
        ctx.body = newChat;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

module.exports = router;