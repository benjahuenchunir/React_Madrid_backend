const Router = require('koa-router');
const { User } = require('../models');
const router = new Router();

router.get('/', async (ctx) => {
    try {
        const users = await User.findAll();
        ctx.status = 200;
        ctx.body = users;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

router.post('/', async (ctx) => {
    try {
        const newUser = await User.create(ctx.request.body);
        ctx.status = 201;
        ctx.body = newUser;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

module.exports = router;