const Router = require('koa-router');
const { Message, Member, MessageStatus, User, MessageFile } = require('../models');
const router = new Router();
const cloudinary = require('./../utils/cloudinaryConfig');
const multer = require('@koa/multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const util = require('util');
const unlink = util.promisify(fs.unlink);
const canSendMessage = require('../utils/permissions');

router.post('/', upload.array('files'), async (ctx) => {
    try {
        const { idUser, idChat, message, pinned, deletesAt, forwarded, respondingTo } = ctx.request.body;
        const files = ctx.request.files;

        // Validate params
        if (!idUser || !idChat || (!message && (!files || files.length === 0))) {
            ctx.status = 400;
            ctx.body = { error: 'Se requiere idUser, idChat y message o files' };
            return;
        }

        // Check if user is a member of the chat and has permission to send messages
        if (!(await canSendMessage(idUser, idChat))) {
            ctx.status = 403;
            ctx.body = { error: 'No tienes permiso para enviar mensajes en este chat' };
            return;
        }

        // Create message
        const newMessage = await Message.create({
            id_chat: idChat,
            id_user: idUser,
            message: message,
            pinned: pinned,
            deletes_at: deletesAt || null,
            forwarded: forwarded,
            responding_to: respondingTo || null
        });

        // Create message statuses for all chat members except the sender
        const members = await Member.findAll({ where: { id_chat: idChat } });
        const messageStatuses = await Promise.all(
            members
                .filter(member => member.id_user !== idUser)
                .map(member => MessageStatus.create({
                    id_user: member.id_user,
                    id_message: newMessage.id
                }))
        ); // TODO send statuses

        // Create message files
        let messageFiles = [];
        if (files && files.length > 0) {
            messageFiles = await Promise.all(files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, { resource_type: "raw" });
                const messageFile = await MessageFile.create({
                    id_message: newMessage.id,
                    name: file.originalname,
                    size: file.size,
                    file_url: result.url
                });
                await unlink(file.path);
                return messageFile.toDomain();
            }));
        }

        const { createdAt: time, ...messageData } = newMessage.toJSON();
        const user = await User.findOne({ where: { id: idUser }, attributes: ['id', 'name', 'profile_picture_url'] });

        ctx.status = 201;
        ctx.body = { ...messageData, time, user: user.toDomain(), files: messageFiles };
    } catch (error) {
        console.log(error);
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

module.exports = router;