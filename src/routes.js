const Router = require('koa-router');
const users = require('./routes/users');
const chats = require('./routes/chats');
const messages = require('./routes/messages');
const auth = require('./routes/authentication');
const jwtMiddleware = require('koa-jwt');

const router = new Router();


router.use('/chats', chats.routes());
router.use('/messages', messages.routes());
router.use('/auth', auth.routes());
router.use('/users', users.routes());


// Since this line is added, all routes below this line will require a valid JWT token
router.use(jwtMiddleware({ secret: process.env.JWT_SECRET }))


module.exports = router;