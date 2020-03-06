import siteServerProduction from './site_server_production.json'
import siteServerTest from './site_server_test.json'

const appEnv = process.env.NUXT_ENV_APP_ENV || 'test'

const siteServer = appEnv == 'production' ? siteServerProduction : siteServerTest

export default siteServer
