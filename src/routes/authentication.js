const Router = require('koa-router');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const router = new Router();

router.post('authentication.signup', '/signup', async (ctx) => {
    const authInfo = ctx.request.body;
    let user = await ctx.orm.User.findOne({ where: { email: authInfo.email } })
    if (user) {
        ctx.body = { message: 'Email already exists' };
        ctx.status = 400;
        return;
    }
    try {
        user = await ctx.orm.User.create({
            name: authInfo.name,
            last_name: authInfo.last_name,
            password: authInfo.password,
            email: authInfo.email, 
            phone: authInfo.phone,
            profile_picture_url: authInfo.profile_picture_url,
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