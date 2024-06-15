const Router = require('koa-router');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const multer = require('@koa/multer');
const util = require('util');
const fs = require('fs');
const unlink = util.promisify(fs.unlink);
const upload = multer({ dest: 'uploads/' });
dotenv.config();
const cloudinary = require('./../utils/cloudinaryConfig');
const { User } = require('../models');
const bcrypt = require('bcrypt');


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

router.patch('/edit', upload.single('file'), async (ctx) => {
    try {
        console.log("Here");
        // TODO Identify via id -> get id from email
        const { name, last_name, email, password, phone } = ctx.request.body;
        const file = ctx.request.file;

        let user = await User.findOne({ where: { email } });
        if (!user) {
            ctx.status = 404;
            ctx.body = { message: 'User not found' };
            return;
        }

        let profilePictureUrl = null;
        if (file) {
            try {
                const result = await cloudinary.uploader.upload(file.path);
                profilePictureUrl = result.url;
                await unlink(file.path);
            } catch (uploadError) {
                console.log(uploadError);
                ctx.status = 500;
                ctx.body = { message: 'Error uploading file to Cloudinary, the file was ' + file.path + ' ' + uploadError.message
                };
                return;
            }
        }

        try {
            const saltRounds = 5;
            const hashPassword = await bcrypt.hash(password, saltRounds);
            user = await User.update({
                name,
                last_name,
                email,
                password: hashPassword,
                phone,
                profile_picture_url: profilePictureUrl,
                role: 'user'
            }, {where: { email: email }});
        } catch (error) {
            ctx.status = 500;
            ctx.body = { message: "Error updating user " + error.message};
            return;
        }

        ctx.status = 201;
        ctx.body = { message: `User of name ${user.name} and email ${user.email} updated` };

    } catch (error) {
        console.log(error);
        ctx.status = 500;
        ctx.body = { message: error.message };
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

module.exports = router;