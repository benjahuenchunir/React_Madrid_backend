const jwt = require('jsonwebtoken');

function getTokenFromHeader(ctx) {
    const authHeader = ctx.request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('No token provided');
    }
    return authHeader.split(' ')[1];
}

function getTokenFromParam(ctx) {
    const token = ctx.query.token;
    if (!token) {
        throw new Error('No token provided');
    }
    return token;
}

function getUserIdFromToken(ctx, tokenGetter = getTokenFromHeader) {
    const token = tokenGetter(ctx);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return Number(decoded.sub);
    } catch (error) {
        throw new Error('Invalid token');
    }
}

module.exports = { getUserIdFromToken, getTokenFromParam };
