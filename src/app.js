const Koa = require('koa');
const websockify = require('koa-websocket');
const Logger = require('koa-logger');
const { koaBody } = require('koa-body');
const fs = require('fs');
const yamljs = require('yamljs');
const {koaSwagger} = require('koa2-swagger-ui');
const { router, ws_router } = require('./routes.js');
const bodyParser = require('koa-bodyparser');
const orm = require('./models/index.js');
const cors = require('@koa/cors');

const app = websockify(new Koa());

app.context.orm = orm;

// cors para poder hacer peticiones desde el frontend
app.use(cors());

// Middlewares proporcionados por Koa
app.use(Logger());
app.use(koaBody());
app.use(bodyParser());

// API Docs
let spec = fs.readFileSync('./api.yaml', 'utf8');
let dbHost = process.env.DB_HOST === '127.0.0.1' ? 'localhost' : process.env.DB_HOST;
spec = spec.replace('${DB_HOST}', dbHost);
spec = spec.replace('${PORT}', process.env.PORT);
spec = yamljs.parse(spec);

app.use(koaSwagger({
    routePrefix: '/docs',
    swaggerOptions: { spec },
  })
)

// koa router
app.use(router.routes()).use(router.allowedMethods());
app.ws.use(ws_router.routes()).use(ws_router.allowedMethods());

module.exports = app;