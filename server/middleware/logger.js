module.exports = async function(ctx, next) {
    if (ctx.isResource) {
        return await next()
    }

    const start = Date.now()
    await next()
    const end = Date.now()

    console.log(`${ctx.method} ${ctx.url} - total cost ${end - start}ms - ${ this.statusCode || 200 }`);
}