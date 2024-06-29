const Router = require('koa-router');
const { Chat, User, Message, MessageFile, Member } = require('../models');
const router = new Router();
const { getUserIdFromToken } = require('../utils/auth');
const db = require('../models/index.js');
const cloudinary = require('./../utils/cloudinaryConfig');
const multer = require('@koa/multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const util = require('util');
const unlink = util.promisify(fs.unlink);

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

router.post('/', upload.single('image'), async (ctx) => {
    const transaction = await db.sequelize.transaction();
    try {
        const idUser = getUserIdFromToken(ctx);

        // Create the chat
        const { name, mode, users } = ctx.request.body;
        let userObj = users
        try {
            userObj = JSON.parse(users)
            // users was passed using FormData
        } catch (error) {
            // users was passed directly through body
        }
        const image = ctx.file;
        let image_url = `https://ui-avatars.com/api/?name=${name}`;
        if (image) {
            const result = await cloudinary.uploader.upload(image.path);
            image_url = result.url;
            await unlink(image.path);
        }
        const newChat = await Chat.create({ name, image_url, mode }, { transaction });
        
        // Create owner member
        await Member.create({
            id_chat: newChat.id,
            id_user: idUser,
            role: 'owner'
        }, { transaction })

        // Create the rest of members
        for (const user of userObj) {
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

router.get('/dms/:id', async (ctx) => {
    try {
        const idUser = getUserIdFromToken(ctx);
        const idOtherUser = Number(ctx.params.id);
        const targetIds = idUser === idOtherUser ? [idUser] : [idUser, idOtherUser]

        const user = await User.findByPk(idUser);
        const dms = await user.getChats({
            where: {
                mode: 'dm'
            },
            include: [{
                model: User,
                as: 'Users',
                attributes: ['id']
            }]
        })

        const dm = dms.find(dm => targetIds.length === dm.Users.length && dm.Users.every(user => targetIds.includes(user.id)));

        if (!dm) {
            ctx.status = 404;
            ctx.body = { error: 'DM no encontrado' };
            return;
        }

        ctx.status = 200;
        ctx.body = dm.id;
    } catch (error) {
        console.error(error)
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
})

module.exports = router;