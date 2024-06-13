const Router = require('koa-router');
const users = require('./routes/users');
const chats = require('./routes/chats');
const messages = require('./routes/messages');

const router = new Router();

router.use('/users', users.routes());
router.use('/chats', chats.routes());
router.use('/messages', messages.routes());

module.exports = router;