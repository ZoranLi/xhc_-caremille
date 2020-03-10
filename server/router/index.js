const url = require('url');
const axios = require('axios')
const Router = require('koa-router')
const proxy = require('../controllers/proxy')
const _ = require('lodash')
const topDomain = require('top-domain');

const {sites} = require(`../sites`)

const baseURL = sites.napi

const router = new Router();
module.exports = router;

// 微信服务器验证
const mpReg = new RegExp('^\/MP_verify_(.+)\.txt$')
router.get(mpReg, async (ctx) => {
  const matcher = ctx.path.match(mpReg)
  
  ctx.body = matcher[1]
});

router.post('/login', async (ctx, next) => {
  let resp = await proxy.fn_post(ctx, `${baseURL}/user/login/v2`)
  console.log(resp);
  ctx.body = resp.res.data
});

router.post('/codeLogin', async (ctx, next) => {
  let resp = await proxy.fn_post(ctx, `${baseURL}/user/register/iden`)
  ctx.body = resp.res.data
});

router.post('/v2/user/third_account/register', async (ctx) => {
  
  const resp = await axios.post(sites.napi + ctx.path, JSON.parse(ctx.rawbody.toString()), {
    headers: {original_domain: '.' + topDomain(ctx.host)}
  }).catch(e => console.log(e))
  
  
  console.log(resp.data)
  
  ctx.append('Set-Cookie', resp.headers['set-cookie'])
  
  ctx.body = resp.data
})

const removeCookies = async (ctx, next) => {
  ['xhc_token', 'xhc_prefix', 'xhc_hashTimes', 'open_id'].forEach(name => ctx.cookies.set(name, '', {
    path: '/',
    domain: '.' + topDomain(ctx.host),
    httpOnly: false,
    expires: new Date(Date.now() - 1000)
  }))
  
  await next()
}

// 退出登陆
router.get('/logout', removeCookies, async (ctx) => {
  ctx.body = `<script>location.href='${ctx.query.redirect || '/'}'</script>`
})

router.get('/WTXjfQUkR3.txt', async (ctx, next) => {
  ctx.body = '57cba5b858ac6677ad0a37c9f1416dea'
})

router.get('/MP_verify_4zI7WsXW0zC5dzGc.txt', async (ctx, next) => {
  ctx.body = '4zI7WsXW0zC5dzGc'
})



