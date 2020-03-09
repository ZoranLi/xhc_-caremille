import _ from 'lodash'
export const strict = false
export const state = () => ({
    user: {},
    logout: '/logout?redirect=%2Fjoinus',
})

export const mutations = {
    setUser(state, user) {
        state.user = user || {}
    }
};

export const getters = {
    login(state) {
        return !_.isEmpty(state.user)
    }
};

export const actions = {
    async nuxtServerInit({ commit }, { $axios, app, req }) {
        const host = req.headers.host
        const token = app.$cookies.get('xhc_token') || ''
        if(token){
            const user = await $axios.$get(`/user/user_info_by_token?token=${token}`)
            commit('setUser', user.data)
        }
    },
}
