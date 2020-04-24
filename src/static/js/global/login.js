import { makeApi } from '../util/apiHttp'
import store from '../../../store'
import { Set } from '../util/storage'
import { getUrlKey } from '../util/data'
import router, { resetRouter } from '../../../router'
import { GetAppid } from './global'

export const generateRoute = async (menus = []) => {
  store.commit('user/SET_MENU', menus)
  resetRouter()
  let routes = await store.dispatch('permission/generateRoutes', menus)
  router.addRoutes(routes)
}

export const saveApi = (api) => {
  store.commit('app/SET_API', api)
  store.dispatch('app/setApi', api)
  makeApi('app', api)
  Set(getUrlKey('id'), 'api', api, 86000)
}

export const saveToken = (token) => {
  store.dispatch('user/setToken', token)
  Set(GetAppid(), 'token', token)
}

export const saveRules = (rule) => {
  store.dispatch('user/setRule', rule)
  Set(GetAppid(), 'rule', rule)
}

export const saveGuest = (guest) => {
  store.dispatch('user/setGuest', guest)
  Set(GetAppid(), 'guest', guest)
}

export const saveUser = (user) => {
  store.dispatch('user/setUser', user)
  Set(GetAppid(), 'guest', user)
}

export default {
  generateRoute,
  saveUser,
  saveGuest,
  saveRules,
  saveToken
}
