const Router = require('koa-router');
const { Chat, User, Message, MessageFile, Member } = require('../models');
const router = new Router();
const { getUserIdFromToken } = require('../utils/auth');
const { literal } = require('sequelize')
const db = require('../models/index.js')

router.get('/', async (ctx) => {
    try {
        const userId = Number(ctx.query.userId);

        const allChats = await Chat.findAll({
            attributes: ['name', 'image_url', 'mode'],
            include: [
                {
                    model: User
                },
                {
                    model: Message,
                    order: [['id', 'DESC']],
                    limit: 1,
                }
            ]
        });

        const userChats = allChats.filter(chat =>
            chat.Users.some(user => user.id === userId)
        );

        const modifiedChats = await Promise.all(userChats.map(async chat => await chat.toDomain(userId)))

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
    const transaction = await db.sequelize.transaction();
    try {
        const idUser = getUserIdFromToken(ctx);

        const { name, image_url, mode, users } = ctx.request.body;
        const newChat = await Chat.create({ name, image_url, mode }, { transaction });

        for (const user of users) {
            await Member.create({
                id_chat: newChat.id,
                id_user: user.id,
                role: user.role
            }, { transaction });
        }

        await transaction.commit();
        ctx.status = 201;
        ctx.body = await newChat.toDomain(idUser);
    } catch (error) {
        console.error(error)
        await transaction.rollback();
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

router.get('/users/:id', async (ctx) => {
    try {
        const idUser = getUserIdFromToken(ctx);
        const idOtherUser = Number(ctx.params.id);

        const chat = await Chat.findOne({
            include: [{
                model: User,
                attributes: [], // Exclude User attributes from the final result
                through: {
                    attributes: [] // Exclude attributes from Member
                }
            }],
            where: literal(`
                EXISTS (
            SELECT 1
            FROM "Members" AS "Member"
            WHERE "Member"."id_chat" = "Chat"."id"
            GROUP BY "Member"."id_chat"
            HAVING COUNT(DISTINCT "Member"."id_user") = 2
            AND ARRAY_AGG(DISTINCT "Member"."id_user") @> ARRAY[${idUser}, ${idOtherUser}]
            AND ARRAY[${idUser}, ${idOtherUser}] @> ARRAY_AGG(DISTINCT "Member"."id_user")
        )
            `)
        });

        if (!chat) {
            ctx.status = 404;
            ctx.body = { error: 'Chat not found' };
            return;
        }

        ctx.status = 200;
        ctx.body = chat.id;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
})

module.exports = router;