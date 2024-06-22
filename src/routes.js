const Router = require('koa-router');
const users = require('./routes/users');
const chats = require('./routes/chats');
const messages = require('./routes/messages');
const auth = require('./routes/authentication');
const jwtMiddleware = require('koa-jwt');
const wsManager = require('./websocketManager');


const router = new Router();

router.use('/auth', auth.routes());

// Since this line is added, all routes below this line will require a valid JWT token
router.use(jwtMiddleware({ secret: process.env.JWT_SECRET }))
router.use('/chats', chats.routes());
router.use('/users', users.routes());
router.use('/messages', messages.routes());
const { getUserIdFromToken, getTokenFromParam } = require('./utils/permissions');


// Websocket routes
const ws_router = new Router();

ws_router.get('/chats/:id/messages', async (ctx) => {
    try {
        ctx.websocket.idUser = getUserIdFromToken(ctx, getTokenFromParam); // Assign the user id to the websocket
        const chatId = Number(ctx.params.id);
        wsManager.addConnection(chatId, ctx.websocket);
    } catch (error) {
        console.log(error);
        ctx.websocket.close(error.code, error.message);
    }
});

module.exports = {router, ws_router};