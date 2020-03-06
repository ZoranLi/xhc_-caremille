const appEnv = process.env.NUXT_ENV_APP_ENV || 'test'
exports.sites = require(`../config/site_server/site_server_${appEnv}`)