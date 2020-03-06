/**
 * 是否是静态资源的请求
 */

module.exports = async (ctx, next) => {
    const blacklist = [
        '__webpack_hmr',
        '_nuxt',
        'unfetch.mjs.map',
        '/images/'
    ]

    ctx.isResource = blacklist.some(str => ctx.url.includes(str))

    await next()
}