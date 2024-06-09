const Router = require('koa-router');
const users = require('./routes/users');
const chats = require('./routes/chats');
const reports = require('./routes/reports');
const messages = require('./routes/messages');

const router = new Router();

router.use('/users', users.routes());
router.use('/chats', chats.routes());
router.use('/reports', reports.routes());
router.use('/messages', messages.routes());

module.exports = router;