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

router.get('/:id', async (ctx) => {
    try {
        const user = await User.findByPk(ctx.params.id);
        if (user) {
            ctx.status = 200;
            ctx.body = user;
        } else {
            ctx.status = 404;
            ctx.body = { error: 'User not found' };
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

router.post('/', async (ctx) => {
    try {
        const newUser = await User.create(ctx.request.body);
        ctx.status = 201;
        ctx.body = newUser.toDomain();
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

router.delete('/:id', async (ctx) => {
    try {
        const user = await User.findByPk(ctx.params.id);
        if (user) {
            await user.destroy();
            ctx.status = 204;
        } else {
            ctx.status = 404;
            ctx.body = { error: 'User not found' };
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});


router.patch('/:id', async (ctx) => {
    try {
        const user = await User.findByPk(ctx.params.id);
        if (user) {
            await user.update(ctx.request.body);
            ctx.status = 200;
            ctx.body = user.toDomain();
        } else {
            ctx.status = 404;
            ctx.body = { error: 'User not found' };
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});


module.exports = router;