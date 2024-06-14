const Router = require('koa-router');
const { koaBody } = require('koa-body');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const multer = require('@koa/multer');
const unlink = util.promisify(fs.unlink);
const upload = multer({ dest: 'uploads/' });
dotenv.config();
const cloudinary = require('./../utils/cloudinaryConfig');

const router = new Router();

router.post('/signup', koaBody({ multipart: true }), async (ctx) => {
    const { body, files } = ctx.request;
    const authInfo = body;
    console.log(body);
    let user = await ctx.orm.User.findOne({ where: { email: authInfo.email } })
    if (user) {
        ctx.body = { message: 'Email already exists' };
        ctx.status = 400;
        return;
    }
    try {

        const file = files.files; 
        const result = await cloudinary.uploader.upload(file.path, { resource_type: 'raw' });

        user = await ctx.orm.User.create({
            name: authInfo.name,
            last_name: authInfo.last_name,
            password: authInfo.password,
            email: authInfo.email, 
            phone: authInfo.phone,
            profile_picture_url: result.url,
            role: 'user'
        })
    } catch (error) {
        ctx.body = { message: error.message };
        ctx.status = 400;
        return;
    }
    ctx.body = { message: 'User of name ' + user.name + 'and email '+ user.email + ' created' };
    ctx.status = 201;
});

router.post('authentication.login', '/login', async (ctx) => {
    let user;
    const authInfo = ctx.request.body;
    try {
        user = await ctx.orm.User.findOne({ where: { email: authInfo.email } })
    } catch (error) {
        ctx.body = { message: error.message };
        ctx.status = 400;
        return;
    }
    if (!user) {
        ctx.body = { message: 'User not found' };
        ctx.status = 404;
        return;
    }
    if (user.password == authInfo.password) {
        ctx.body = { message: 'User ' + user.name + ' logged in' };
        ctx.status = 200;
    } else {
        ctx.body = { message: 'Incorrect password' };
        ctx.status = 401;
        return;
    }

    const scope = user.role;
    const expirationSeconds = 1 * 60 * 60 * 24;
    const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
    var token = jwt.sign(
        {scope: scope},
        JWT_PRIVATE_KEY,
        {subject: user.id.toString()},
        { expiresIn: expirationSeconds }
    );

    ctx.body = {"token": token, "token_type": "Bearer", "expires_in": expirationSeconds, "scope": scope};
    ctx.status = 200;
});


module.exports = router;