const Router = require('koa-router');
const { Chat, User } = require('../models');
const router = new Router();

router.get('/', async (ctx) => {
    try {
        const userId = Number(ctx.query.userId);

        const allChats = await Chat.findAll({
            attributes: ['name', 'image_url'],
            include: [{
                model: User
            }]
        });
        
        const userChats = allChats.filter(chat => 
            chat.Users.some(user => user.id === userId)
        );

        const modifiedChats = userChats.map(chat => {
            let modifiedChat = { ...chat.toJSON() };

            if (modifiedChat.Users.length === 2) {
                const otherUser = modifiedChat.Users.find(user => user.id !== userId);

                modifiedChat.name = `${otherUser.name} ${otherUser.last_name}`;
                modifiedChat.image_url = otherUser.profile_picture_url;
            }

            return {
                id: modifiedChat.id,
                name: modifiedChat.name,
                image_url: modifiedChat.image_url
            };
        });

        ctx.status = 200;
        ctx.body = modifiedChats;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

module.exports = router;