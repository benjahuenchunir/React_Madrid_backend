const Router = require('koa-router');
const users = require('./routes/users');
const chats = require('./routes/chats');
const messages = require('./routes/messages');
const auth = require('./routes/authentication');
const jwtMiddleware = require('koa-jwt');

const router = new Router();

router.use('/auth', auth.routes());

// Since this line is added, all routes below this line will require a valid JWT token
router.use(jwtMiddleware({ secret: process.env.JWT_SECRET }))
router.use('/chats', chats.routes());
router.use('/users', users.routes());
router.use('/messages', messages.routes());


const ws_router = new Router();

ws_router.get('/chats/:id/messages', async (ctx) => {
    ctx.websocket.send('Hey! You are connected to the WebSocket of id ' + ctx.params.id);
    ctx.websocket.on('message', function(message) {
        console.log('Received:', message);
        // Echo the message back to the client
        ctx.websocket.send('Echo: ' + message);
    });
    // ctx.websocket.on('message', (message) => {
    //     // Handle incoming messages
    //     console.log(message);
    //     // You can also broadcast to all connected clients
    //     ctx.websocket.send('Message received');
    // });
    // ctx.websocket.on('close', () => {
    //     console.log('WebSocket closed');
    // });
// app.ws.use((ctx) => {
//   if (ctx.path === '/chats/{id}/messages') {
//     ctx.websocket.on('message', (message) => {
//       // Handle incoming messages
//       console.log(message);
//       // You can also broadcast to all connected clients
//       ctx.websocket.send('Message received');
//     });
//     ctx.websocket.on('close', () => {
//       console.log('WebSocket closed');
//     });
//   }
// });
});


module.exports = {router, ws_router};