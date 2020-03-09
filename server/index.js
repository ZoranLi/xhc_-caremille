const Koa = require('koa')
const consola = require('consola')
const logger = require('./middleware/logger')
const blacklist = require('./middleware/blacklist')
const { Nuxt, Builder } = require('nuxt')

const { login } = require('xhc-auth')
const { sites } = require('./sites')
const { appOpts } = require('../config/app')

const app = new Koa()
const routers = require('./router')
const getRawBody = require('raw-body');
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')

config.dev = !(app.env === 'production')

app.use(blacklist)
app.use(logger)

async function start() {
    app.use(async (ctx, next) => {
        // if (ctx.path !== '/upgrading') {
        //     ctx.redirect('/upgrading')
        //     return
        // }
        ctx.rawbody = await getRawBody(ctx.req);
        await next();
    });

    app.use(routers.routes()).use(routers.allowedMethods());

    app.use(login({
        appName: appOpts.appName,
        appid: appOpts.appid,
        baseURL: sites.napi,
        
        exclude: ctx => {
            if (ctx.isResource) { return true }
            if (ctx.path == '/login') { return true }
            if (ctx.path == '/upgrading') { return true }
            if (ctx.path.includes('propagation')) { return true }
            if (ctx.path.includes('/favicon.ico')) { return true }
            return false
        }
    }))

    const nuxt = new Nuxt(config)

    const host = process.env.HOST || '127.0.0.1'
    const port = process.env.PORT || 3000

    // Build in development
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    } else {
        await nuxt.ready()
    }

    function render(req, res) {
        return new Promise((resolve, reject) => {
            res.on('close', resolve)
            res.on('finish', resolve)
            nuxt.render(req, res, promise => {
                // nuxt.render passes a rejected promise into callback on error.
                promise.then(resolve).catch(reject)
            })
        })
    }

    app.use(async (ctx, next) => {

        ctx.status = 200
        ctx.req.ctx = ctx

        console.log(ctx.href)

        await render(ctx.req, ctx.res)

        await next()
    })

    app.listen(port, host)

    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    })
}

start()
