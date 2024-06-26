const Router = require('koa-router');
const { Message, MessageFile } = require('../models');
const router = new Router();
const cloudinary = require('./../utils/cloudinaryConfig');
const multer = require('@koa/multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const util = require('util');
const unlink = util.promisify(fs.unlink);
const { canSendMessage, getUserIdFromToken } = require('../utils/permissions');

router.post('/', upload.array('files'), async (ctx) => {
    try {
        const idUser = getUserIdFromToken(ctx);

        const { idChat, message, pinned, deletesAt, forwarded, respondingTo } = ctx.request.body;
        const files = ctx.request.files;

        // Validate params
        if (!idChat || (!message && (!files || files.length === 0))) {
            ctx.status = 400;
            ctx.body = { error: 'Se requiere, idChat y message o files' };
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

router.get('/:id', async (ctx) => {
    try {
        const message = await Message.findByPk(ctx.params.id);
        if (message) {
            ctx.status = 200;
            ctx.body = message;
        } else {
            ctx.status = 404;
            ctx.body = { error: 'Message not found' };
        }
    } catch (error) {
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

        const messageEntity = await Message.findOne({ where: { id: id } });
        if (!messageEntity) {
            ctx.status = 404;
            ctx.body = { error: 'No se encontró un mensaje con esa id' };
            return;
        }

        const idUser = getUserIdFromToken(ctx);
        if (!canSendMessage(idUser, messageEntity.id_chat)) {
            ctx.status = 403;
            ctx.body = { error: 'No tienes permiso para editar este mensaje' };
            return;
        }

        const updateData = {};
        if (message !== undefined) {
            updateData.message = message;
            updateData.last_edit_date = new Date();
        }
        if (pinned !== undefined) updateData.pinned = pinned;
        if (deletesAt !== undefined) updateData.deletes_at = deletesAt;

        messageEntity.update(updateData);

        ctx.status = 200;
        ctx.body = await messageEntity.getFullMessage();
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

        const message = await Message.findOne({ where: { id: id } });

        if (!message) {
            ctx.status = 404;
            ctx.body = { error: 'No se encontró un mensaje con esa id' };
            return;
        }

        const idUser = getUserIdFromToken(ctx);
        if (!canSendMessage(idUser, message.id_chat)) {
            ctx.status = 403;
            ctx.body = { error: 'No tienes permiso para eliminar este mensaje' };
            return;
        }

        message.destroy();

        ctx.status = 200;
        ctx.body = { message: 'Mensaje eliminado con éxito' };
    } catch (error) {
        console.log(error);
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

router.get('/', async (ctx) => {
    try {
        const messages = await Message.findAll();
        ctx.status = 200;
        ctx.body = messages;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
}   );


module.exports = router;