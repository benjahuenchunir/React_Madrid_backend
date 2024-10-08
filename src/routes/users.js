const Router = require('koa-router');
const { User } = require('../models');
const router = new Router();
const multer = require('@koa/multer');
const util = require('util');
const fs = require('fs');
const unlink = util.promisify(fs.unlink);
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('./../utils/cloudinaryConfig');

router.get('/', async (ctx) => {
    try {
        const users = await User.findAll();
        ctx.status = 200;
        ctx.body = users.map((user) => user.toDomain());
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


router.patch('/:id', upload.single('file'), async (ctx) => {
    try {
        const user = await User.findByPk(ctx.params.id);
        const image = ctx.file;

        if (!user) {
            ctx.status = 404;
            ctx.body = { error: 'User not found' };
            return;
        }

        let image_url = user.profile_picture_url;
        if (image) {
            const result = await cloudinary.uploader.upload(image.path);
            image_url = result.url;
            await unlink(image.path);
        }

        await user.update({ ...ctx.request.body, profile_picture_url: image_url });
        ctx.status = 200;
        ctx.body = user.toDomain();
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});


module.exports = router;