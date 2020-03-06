const appEnv = process.env.NUXT_ENV_APP_ENV || 'test'
const app = process.env.app


const isProd = appEnv == 'production'
const isFocusfemme = app == 'focusfemme'

const appOpts = {}

if (isFocusfemme) {
	appOpts.appName = 'focus_face'
} else {
	appOpts.appName = 'juemihuayuan'
}

if (!isProd) {
	appOpts.appid = 'wx986799ee6b7223a4'
} else {
	if (isFocusfemme) {
		appOpts.appid = 'wx968486ebf50b6044'
	} else {
		appOpts.appid = 'wx6d2aacb0263662e5'
	}
}

exports.appOpts = appOpts