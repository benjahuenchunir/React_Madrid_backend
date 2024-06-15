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

router.post('/signup', upload.single('file'), async (ctx) => {
    try {
        const { name, last_name, email, password, phone } = ctx.request.body;
        const file = ctx.request.file;

        let user = await User.findOne({ where: { email } });
        if (user) {
            ctx.status = 400;
            ctx.body = { message: 'Email already exists' };
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
            user = await User.create({
                name,
                last_name,
                email,
                password: hashPassword,
                phone,
                profile_picture_url: profilePictureUrl,
                role: 'user'
            });
        } catch (error) {
            ctx.status = 500;
            ctx.body = { message: "Error creating user " + error.message};
            return;
        }

        ctx.status = 201;
        ctx.body = { message: `User of name ${user.name} and email ${user.email} created` };

    } catch (error) {
        console.log(error);
        ctx.status = 500;
        ctx.body = { message: error.message };
    }
});


router.post('/login', async (ctx) => {
    try{
        const { email, password } = ctx.request.body;
        console.log(email)
        console.log("aaaaaaa")
        let user = await User.findOne({ where: { email: email } });

        if (!user) {
            ctx.body = { message: 'User not found' };
            ctx.status = 404;
            return;
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (validPassword) {
            const scope = user.role;
            const expirationSeconds = 1 * 60 * 60 * 24;
            const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
            var token = jwt.sign(
                {scope: scope},
                JWT_PRIVATE_KEY,
                {subject: user.id.toString(),
                 expiresIn: expirationSeconds }
            );
    
            ctx.body = {"token": token, "token_type": "Bearer", "expires_in": expirationSeconds, "scope": scope};
            ctx.status = 200;
        } else {
            ctx.body = { message: 'Incorrect password' };
            ctx.status = 401;
            return;
        }
    }

    catch (error) {

        ctx.status = 500;
        ctx.body = { message: "Error in login process " + error.message};
    }
    
});


module.exports = router;