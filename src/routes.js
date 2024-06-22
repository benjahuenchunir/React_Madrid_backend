const Router = require('koa-router');
const users = require('./routes/users');
const chats = require('./routes/chats');
const messages = require('./routes/messages');
const auth = require('./routes/authentication');
const jwtMiddleware = require('koa-jwt');
const wsManager = require('./websocketManager');
const jwt = require('jsonwebtoken');


const router = new Router();

router.use('/auth', auth.routes());

// Since this line is added, all routes below this line will require a valid JWT token
router.use(jwtMiddleware({ secret: process.env.JWT_SECRET }))
router.use('/chats', chats.routes());
router.use('/users', users.routes());
router.use('/messages', messages.routes());


const ws_router = new Router();

ws_router.get('/chats/:id/messages', async (ctx) => {
    const token = ctx.query.token;
    console.log('Token:', token);

    if (!token) {
        ctx.websocket.close(4001, 'Se requiere el token de autenticación');
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        ctx.websocket.idUser = Number(decoded.sub); // Assign the user id to the websocket
    } catch (err) {
        ctx.websocket.close(4002, 'Token invalido o expirado');
        return;
    }

    const chatId = Number(ctx.params.id);
    wsManager.addConnection(chatId, ctx.websocket);
});

module.exports = {router, ws_router};