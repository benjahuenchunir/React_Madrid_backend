const Router = require('koa-router');
const { Chat, Message } = require('../models');
const router = new Router();

router.get('/', async (ctx) => {
    try {
        const chats = await Chat.findAll({
            include: [
                {
                    model: Message
                }
            ]
        });
        ctx.status = 200;
        ctx.body = chats;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

module.exports = router;