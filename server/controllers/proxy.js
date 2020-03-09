const axios = require('axios')

function fn_post(ctx, url) {
    return new Promise((resolve, reject) => {
        const host = ctx.host
        
        let original_domain = host.split('.')
            original_domain = `.${original_domain[1]}.${original_domain[2]}`
  
      console.log(ctx.request);
      axios.post(`${url}`,
                JSON.parse(ctx.rawbody.toString()), {
                    headers: {
                        original_domain,
                    },
                },).then(function (res) {
                if (res.headers['set-cookie']) {
                    ctx.append('set-cookie', res.headers['set-cookie'])
                }

                console.info('\x1b[33m%s\x1b[0m', url)
                console.info('\x1b[36m%s\x1b[0m', '>>>>>>>>>>');
                console.log(JSON.stringify(res.data))
                console.info('\x1b[36m%s\x1b[0m', '<<<<<<<<<<');

                resolve({
                    ctx,
                    res
                });
            })
            .catch(function (err) {
                reject(err);
            })
    });
}

module.exports = {
    fn_post
}
