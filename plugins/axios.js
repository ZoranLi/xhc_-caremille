import md5 from 'md5'
import URL from 'url'
import site_server from '../config/site_server'

function getCheck(url, prefix, hashtime, timestamp) {
  var check = md5([prefix, url, timestamp].join('_')), i = 0;
  while (i < hashtime - 1) {
    check = md5([prefix, check, timestamp].join('_'));
    i++;
  }
  return check;
}

function appendQuery(url, query = {}) {
  const urlObj = URL.parse(url, true)
  return URL.format({
    pathname: urlObj.pathname,
    query: Object.assign({}, query, urlObj.query)
  })
}

export default function ({$axios, app, query, store}) {
  $axios.onRequest(config => {
    let team_code = store.state.team_code
    let __method = config.method.toLowerCase()
    
    try {
      let __url = config.url.split('::')
      
      if (__url.length == 2) {
        config.baseURL = site_server[__url[0]]
      } else {
        config.baseURL = site_server.napi
      }
    } catch (e) {
      console.log(e)
    }
    
    // if (__method == 'put' || __method == 'post') {
    //   try {
    //     if (!config.data) {
    //       config.data = {}
    //     }
    //     config.data.team_code = team_code
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }
    
    // query.team_code = team_code
    config.url = appendQuery(config.url, query)
    
    if (app.$cookies.get('xhc_token')) {
      const
        token = app.$cookies.get('xhc_token'),
        prefix = app.$cookies.get('xhc_prefix'),
        hashtime = app.$cookies.get('xhc_hashTimes'),
        timestamp = Date.now(),
        check = getCheck(config.url, prefix, hashtime, timestamp)
      
      Object.assign(config.headers.common, {token, check, timestamp})
    }
  })
  
  let isclient = process.client
  $axios.onResponse(d => {
    console.info(`${isclient ? '' : '\x1b[33m%s\x1b[0m'}`, d.config.url);
    console.info(`${isclient ? '' : '\x1b[36m%s\x1b[0m'}`, '>>>>>>>>>>');
    console.info(JSON.stringify(d.data))
    console.info(`${isclient ? '' : '\x1b[36m%s\x1b[0m'}`, `cost ${Date.now() - d.config.headers.timestamp}ms <<<<<<<<<<`);
  })
  
}
