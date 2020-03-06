import _ from 'lodash'
// import CONFIG_TEAM_CODE from '../config/team_code.json'

export const strict = false
export const state = () => ({
    user: {},
    logout: '/logout?redirect=%2Fjoinus',
})

export const mutations = {
    setUser(state, user) {
        state.user = user || {}
    },
    setWeiXin(state, weixin) {
        state.weixin = weixin
    },
    // 专颜信息
    setPeople(state, people) {
        state.people = people || {}
    },
    // 会员类型
    setMtype(state, mtype) {
        state.__mtype = mtype.mtype
        state.__mlevel = mtype.level
        state.__mtype_desc = mtype.desc
    },
    setTeamCode(state, team_code){
        state.team_code = team_code
    }
}

export const getters = {
    login(state) {
        return !_.isEmpty(state.user)
    }
}

export const actions = {
    async nuxtServerInit({ commit }, { $axios, app, req }) {
        // const host = req.headers.host
        // if(CONFIG_TEAM_CODE[host]){
        //     commit('setTeamCode', CONFIG_TEAM_CODE[host])
        // }

        // const token = app.$cookies.get('xhc_token') || ''
        // if(token){
        //     const user = await $axios.$get(`/user/user_info_by_token?token=${token}`)
        //     commit('setUser', user.data)
        // }
        //
        // commit('setWeiXin', /micromessenger/.test(req.headers['user-agent'].toLowerCase()))
    },
}
