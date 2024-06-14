const Koa = require('koa');
const Logger = require('koa-logger');
const { koaBody } = require('koa-body');
const fs = require('fs');
const yamljs = require('yamljs');
const {koaSwagger} = require('koa2-swagger-ui');
const router = require('./routes.js');
const orm = require('./models/index.js');
const cors = require('@koa/cors');

const app = new Koa();

app.context.orm = orm;

// cors para poder hacer peticiones desde el frontend
app.use(cors());

// Middlewares proporcionados por Koa
app.use(Logger());
app.use(koaBody());

// .load loads file from root.
let spec = fs.readFileSync('./api.yaml', 'utf8');
spec = spec.replace('${DB_HOST}', process.env.DB_HOST);
spec = spec.replace('${PORT}', process.env.PORT);
spec = yamljs.parse(spec);

app.use(koaSwagger({
    routePrefix: '/swagger',
    swaggerOptions: { spec },
  })
)

app.use(koaSwagger({ // TODO delete after testing
    routePrefix: '/swagger-example',
    swaggerOptions: { url: 'http://petstore.swagger.io/v2/swagger.json'  },
  })
)

// koa router
app.use(router.routes());

app.use((ctx) => {
    ctx.body = 'Hello world';
});

module.exports = app;