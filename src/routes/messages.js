const Router = require('koa-router');
const { Message, MessageFile } = require('../models');
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

        // Create message files
        if (files && files.length > 0) {
            await Promise.all(files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path);
                await MessageFile.create({
                    id_message: newMessage.id,
                    name: file.originalname,
                    size: file.size,
                    file_url: result.url
                });
                await unlink(file.path);
            }));
        }

        ctx.status = 201;
        ctx.body = await newMessage.getFullMessage();
    } catch (error) {
        console.log(error);
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

router.patch('/:id', async (ctx) => {
    try {
        const { id } = ctx.params;
        const { message, pinned, deletesAt } = ctx.request.body;

        if (!id) {
            ctx.status = 400;
            ctx.body = { error: 'Se requiere la id del mensaje' };
            return;
        }

        const updateData = {};
        if (message !== undefined) {
            updateData.message = message;
            updateData.last_edit_date = new Date();
        }
        if (pinned !== undefined) updateData.pinned = pinned;
        if (deletesAt !== undefined) updateData.deletes_at = deletesAt;

        const [updatedRows] = await Message.update(updateData, {
            where: { id: id }
        });

        if (updatedRows === 0) {
            ctx.status = 404;
            ctx.body = { error: 'No se encontró un mensaje con esa id' };
            return;
        }

        const updatedMessage = await Message.findOne({ where: { id: id } });

        ctx.status = 200;
        ctx.body = await updatedMessage.getFullMessage();
    } catch (error) {
        console.log(error);
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

router.delete('/:id', async (ctx) => {
    try {
        const { id } = ctx.params;

        if (!id) {
            ctx.status = 400;
            ctx.body = { error: 'Se requiere la id del mensaje' };
            return;
        }

        const deletedRows = await Message.destroy({
            where: { id: id }
        });

        if (deletedRows === 0) {
            ctx.status = 404;
            ctx.body = { error: 'No se encontró un mensaje con esa id' };
            return;
        }

        ctx.status = 200;
        ctx.body = { message: 'Mensaje eliminado con éxito' };
    } catch (error) {
        console.log(error);
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

module.exports = router;