const Router = require('koa-router');
const users = require('./routes/users');
const chats = require('./routes/chats');
const reports = require('./routes/reports');
const messages = require('./routes/messages');
const auth = require('./routes/authentication');
const jwtMiddleware = require('koa-jwt');
const dotenv = require('dotenv');

const router = new Router();


router.use('/chats', chats.routes());
router.use('/reports', reports.routes());
router.use('/messages', messages.routes());
router.use('/chats', chats.routes());
router.use('/auth', auth.routes());

// Since this line is added, all routes below this line will require a valid JWT token
router.use(jwtMiddleware({ secret: process.env.JWT_SECRET }))

router.use('/users', users.routes());
module.exports = router;