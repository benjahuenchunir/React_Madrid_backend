var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


function getJWTSCOPE(token) {
  const secret = process.env.JWT_SECRET;
  var payload = jwt.verify(token, secret);
  return payload.scope;
}

async function isUser(ctx, next) {
    await next
    var token = ctx.request.header.authorization.split(' ')[1];
    var scope = getJWTSCOPE(token);
    ctx.assert(scope == 'user', 403, 'You are not a user');
}

async function isAdmin(ctx, next) {
    await next
    var token = ctx.request.header.authorization.split(' ')[1];
    var scope = getJWTSCOPE(token);
    ctx.assert(scope == 'admin', 403, 'You are not an admin');
}


module.exports = {
    isUser,
    isAdmin
}