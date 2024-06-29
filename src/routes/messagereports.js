const Router = require('koa-router');
const { MessageReport } = require('../models');
const router = new Router();

router.get('/', async (ctx) => {
    try {
        const messageReports = await MessageReport.findAll();

        if (messageReports.length === 0) {
            ctx.status = 404;
            ctx.body = { error: 'No message reports found' };
            return;
        }
        ctx.status = 200;
        ctx.body = messageReports.map((messageReport) => messageReport.toDomain());
    } catch (error) {
        ctx.status
        ctx.body = { error: error.message };
    }
});

router.get('/:id', async (ctx) => {
    try {
        const messageReport = await MessageReport.findByPk(ctx.params.id);
        if (messageReport) {
            ctx.status = 200;
            ctx.body = messageReport.toDomain();
        } else {
            ctx.status = 404;
            ctx.body = { error: 'Message report not found' };
        }
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: error.message };
    }
});


router.delete('/:id', async (ctx) => {
    try {
        const messageReport = await MessageReport.findByPk(ctx.params.id);
        if (messageReport) {
            await messageReport.destroy();
            ctx.status = 204;
        } else {
            ctx.status = 404;
            ctx.body = { error: 'Report not found' };
        }
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: error.message };
    }
});

router.post('/', async (ctx) => {
    try {
        const newMessageReport = await MessageReport.create(ctx.request.body);
        ctx.status = 201;
        ctx.body = newMessageReport.toDomain();
    } catch (error) {
        console.error(error);
        ctx.status = 400;
        ctx.body = { error: error.message };
    }
});
module.exports = router;