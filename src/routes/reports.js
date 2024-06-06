const Router = require('koa-router');
const { Report } = require('../models');
const router = new Router();

router.get('/', async (ctx) => {
    try {
        const reports = await Report.findAll();
        ctx.status = 200;
        ctx.body = reports;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

module.exports = router;