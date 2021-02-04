import Vue from 'vue'
import { getUserInfo } from '@/api/invoice'
import { login, logout } from '@/api/invoice'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '@/utils/accessToken'
import { resetRouter } from '@/router'
import { title, tokenName } from '@/config'

const state = {
  accessToken: getAccessToken(),
  username: '',
  avatar: '',
  permissions: [],
  user: null,
}
const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  permissions: (state) => state.permissions,
}
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  setUsername(state, username) {
    state.username = username
  },
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  },
  setUser(state, user) {
    state.user = user
  },
}
const actions = {
  setPermissions({ commit }, permissions) {
    commit('setPermissions', permissions)
  },
  async login({ commit }, userInfo) {
    const { data } = await login(userInfo)
    var accessToken = null
    if (data.success) {
      accessToken = Vue.$cookies.get('token')
    } else {
      Vue.prototype.$baseMessage(data.msg, 'error')
      return
    }

    if (accessToken) {
      commit('setAccessToken', accessToken)
      const hour = new Date().getHours()
      const thisTime =
        hour < 8
          ? '早上好'
          : hour <= 11
          ? '上午好'
          : hour <= 13
          ? '中午好'
          : hour < 18
          ? '下午好'
          : '晚上好'
      Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
    } else {
      Vue.prototype.$baseMessage(
        `登录接口异常，未正确返回${tokenName}...`,
        'error'
      )
    }
  },
  async getUserInfo({ commit, state }) {
    const { data } = await getUserInfo(state.accessToken)
    // if (!data) {
    //   Vue.prototype.$baseMessage('验证失败，请重新登录...', 'error')
    //   return false
    // }
    console.log(data)
    let permissions = null
    let username = null
    let avatar = null
    if (!data.success) {
      // Vue.prototype.$baseMessage('验证失败，请重新登录...', 'error')
      Vue.$cookies.remove('token')
      commit('setAccessToken', null)
      commit('setUser', null)
      return false
    } else {
      // alert(2)

      commit('setUser', data.data)
      // let { , , } = data
      permissions = ['admin', 'editor']
      username = data.data.name
      avatar = 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif'
    }

    if (permissions && username && Array.isArray(permissions)) {
      commit('setPermissions', permissions)
      commit('setUsername', username)
      commit('setAvatar', avatar)
      return permissions
    } else {
      Vue.prototype.$baseMessage('用户信息接口异常', 'error')
      return false
    }
  },
  async logout({ dispatch }) {
    await logout(state.accessToken)
    await dispatch('resetAccessToken')
    await resetRouter()
  },
  resetAccessToken({ commit }) {
    commit('setPermissions', [])
    commit('setAccessToken', '')
    removeAccessToken()
  },
}
export default { state, getters, mutations, actions }
