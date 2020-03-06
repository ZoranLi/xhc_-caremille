const url = require('url');
const axios = require('axios')
const pinyin = require('pinyin')
const qs = require('querystring')
const Router = require('koa-router')
const proxy = require('../controllers/proxy')
const _ = require('lodash')
const topDomain = require('top-domain');

const { sites } = require(`../sites`)

const baseURL = sites.napi
const posterURL = sites.poster
const CONFIG_TEAM_CODE = require('../../config/team_code.json')

const router = new Router();
module.exports = router;

// 微信服务器验证
const mpReg = new RegExp('^\/MP_verify_(.+)\.txt$')
router.get(mpReg, async (ctx) => {
    const matcher = ctx.path.match(mpReg)

    ctx.body = matcher[1]
})

router.post('/login', async (ctx, next) => {
    let resp = await proxy.fn_post(ctx, `${baseURL}/user/login/v2`)
    ctx.body = resp.res.data
});

router.post('/codeLogin', async (ctx, next) => {
    let resp = await proxy.fn_post(ctx, `${baseURL}/user/register/iden`)
    ctx.body = resp.res.data
});

router.post('/v2/user/third_account/register', async (ctx) => {

    const resp = await axios.post(sites.napi + ctx.path, JSON.parse(ctx.rawbody.toString()), {
        headers: { original_domain: '.' + topDomain(ctx.host) }
    }).catch(e => console.log(e))


    console.log(resp.data)

    ctx.append('Set-Cookie', resp.headers['set-cookie'])

    ctx.body = resp.data
})

const removeCookies = async(ctx, next) => {
    ['xhc_token', 'xhc_prefix', 'xhc_hashTimes', 'open_id'].forEach(name => ctx.cookies.set(name, '', {
        path: '/',
        domain: '.' + topDomain(ctx.host),
        httpOnly: false,
        expires: new Date(Date.now() - 1000) 
    }))

    await next()
}

router.get('/cookies', async(ctx, next) => {
    const opts = {
        domain: 'm.focusface.cn'
    }
    ctx.cookies.set('xhc_hashTimes', 'hudongyang', {
        domain: `.${topDomain(ctx.host)}`,
        httpOnly: false,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        path: '/',
    })

    console.log(333)

    ctx.body = 'success'
})

// 退出登陆
router.get('/logout', removeCookies, async (ctx) => {
    ctx.body = `<script>location.href='${ctx.query.redirect || '/'}'</script>`
})

router.get('/invite_poster', async (ctx, next) => {
    const team_code = CONFIG_TEAM_CODE[ctx.host]
    
    let data = _.cloneDeep(ctx.query)
    const TC = {
        ZY: 'B00100ZY',
        JM: 'B002JMHY'
    }
    
    let isFocusfemme = team_code === TC.ZY;
    
    try {
        data.real_name_pinyin = pinyin(data.real_name, {
            style: pinyin.STYLE_NORMAL,
        }).toString().replace(/,/ig, '').toUpperCase()
    } catch (err) {
        console.log(err)
    }

    data.real_name_pinyin = (data.real_name_pinyin || '').split('');
    data.real_name = isFocusfemme?data.real_name:(data.real_name || '').split('');
    data.size = isFocusfemme ? '750x1334' : '1080x1920'; //专妍的海报尺寸

    const mainBgImage = {
        [TC.ZY]: `https://wicdn.xiaohongchun.com/goodsmark/1581667327270_RrE3mKQeWs.png`,
        [TC.JM]: `https://wicdn.xiaohongchun.com/goodsmark/1562580425244_585TYYPbWb.jpg`,
    }
    
    const qrUrl = {
        [TC.ZY]: `https://${ctx.host}/joining?invite_code=${data.uuid || data.invite_code}&member_level=${data.member_level}`,
        [TC.JM]: `https://${ctx.host}/join_team?invite_code=${data.uuid || data.invite_code}`,
    }

    const joinText = {
        [TC.ZY]: '小红唇美丽事业',
        [TC.JM]: '觉秘花园美丽事业'
    }

    // 海报背景图片
    if (mainBgImage[team_code]) {
        data.main_bg_image = mainBgImage[team_code]
    }
    // 海报二维码图片
    if (qrUrl[team_code]) {
        data.qr = qrUrl[team_code]
    }
    // 扫描加入 ...
    if (joinText[team_code]) {
        data.joinText = joinText[team_code]
    }
    // 二维码添加 team_code
    if (CONFIG_TEAM_CODE[team_code]) {
        data.qr += '&team_code=' + CONFIG_TEAM_CODE[team_code]
    }

    // 海报缓存一天，修改后立马见效，添加一个值
    data.test = 'test'
    
    let posterUrl = isFocusfemme ?
        `${posterURL}/get_poster/member_focusfemme_invite?${qs.stringify(data)}`
        : `${posterURL}/get_poster/member_crm_group_invite?${qs.stringify(data)}`
  
    let poster = await axios.get(posterUrl)
    poster = poster.data

    ctx.body = poster

    // 数据组装 位置（XHC_H5项目）
    // apps → store → router → crm.js → fn_poster_url
    // html 位置（XHC_H5项目）
    // store → scripts → pages → components → poster → member_crm_group_invite
});

router.get('/weixin/redirect', async (ctx, next) => {
    let query = ctx.query
    let redirect = query.redirect
    delete query.redirect

    let u = url.parse(redirect)
    let q = qs.parse(u.query)

    q = Object.assign(query, q)

    return ctx.redirect(`${u.pathname}?${qs.stringify(q)}`)
})

router.get('/WTXjfQUkR3.txt', async (ctx, next) => {
    ctx.body = '57cba5b858ac6677ad0a37c9f1416dea'
})

router.get('/MP_verify_4zI7WsXW0zC5dzGc.txt', async (ctx, next) => {
    ctx.body = '4zI7WsXW0zC5dzGc'
})

router.get('/get_poster/member_retail_authorization', async (ctx, next) => {
    let query = ctx.query
    let poster = await axios.get(`${posterURL}/get_poster/member_retail_authorization?${qs.stringify(query)}`)
    poster = poster.data
    ctx.body = poster
});

router.get('/get_poster/member_juemi_authorization', async (ctx, next) => {
    let query = ctx.query
    let poster = await axios.get(`${posterURL}/get_poster/member_juemi_authorization?${qs.stringify(query)}`)
    poster = poster.data
    ctx.body = poster
});


