import { Get, Remove, Set } from '../util/storage'
import { getUrlKey } from '../util/data'
import { AuthPost, makeApi } from '../util/apiHttp'
import { saveToken } from './login'

// post请求头
const header = {
  Accept: 'application/json',
  Authorization: 'Bearer'
}
/**
 * token拼接
 * @param token
 * @constructor
 */
export const SetToken = (token) => {
  header.Authorization = 'Bearer ' + token
}

/**
 * 获取appid
 * @param appid (传值、或者直接取链接上带的appid, 或者本地缓存appid)
 * @returns {boolean}
 * @constructor
 */
export const GetAppid = (appid) => {
  if (!appid) appid = localStorage.getItem('appid') ? localStorage.getItem('appid').val : getUrlKey('id')
  appid = Get(appid, 'appid')
  return appid
}

/**
 * 获取appid
 * @param appid (传值、或者直接取链接上带的appid, 或者本地缓存appid)
 * @returns {boolean}
 * @constructor
 */
export const GetOpenid = (appid) => {
  if (!appid) appid = localStorage.getItem('appid') || getUrlKey('id')
  const host = document.domain
  if (host === 'localhost' || host === 'crm.com' || host === 'localhost:8081' || host === 'localhost:8080') {
    Set(GetAppid(), 'openid', GetAppid() === 'wx4c9a577d4ac1e219' ? 'oD1Hz0gZmpkYzNnkfeeEGkV_-tV4' : 'oBYYot1LS3hPTI4DBAklbonHWOUg')
    return GetAppid() === 'wx4c9a577d4ac1e219' ? 'oD1Hz0gZmpkYzNnkfeeEGkV_-tV4' : 'oBYYot1LS3hPTI4DBAklbonHWOUg'
  } else {
    return Get(appid, 'openid')
  }
}

/**
 * get wexin warrant openid
 * @param self
 * @param appid
 * @param type
 * @constructor
 */
export const GetWxOpenId = (self, appid, type) => {
  const openid = GetOpenid()
  if (openid) {
    CheckLogin(self, appid, openid)
  } else {
    const code = getUrlKey('code')
    if (!code) { // 网页授权重新获取code
      const state = 123 // 需要传参数请添加进state
      const redirectUrl = window.location.href
      const Url = encodeURIComponent(redirectUrl)
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${Url}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`
    } else {
      const params = {
        code: code,
        key: appid
      }
      AuthPost('/WeChat/GetOpenid', params).then((res) => {
        if (res.code === 200) {
          self.Toast.clear()
          Set(appid, 'openid', res.data.openid)
          if (!type) CheckLogin(self, appid, res.data.openid)
          if (type) {
            self.openid = res.data.openid
            Set(self.appid, 'openid', res.data.openid)
            Set(self.appid, 'access_token', res.data.access_token)
            saveToken(res.data.access_token)
            self.$router.push({ path: '/' + Get(self.appid, 'redirect_url').url, query: Get(self.appid, 'redirect_url') })
          }
        }
      })
    }
  }
}

/**
 * check user login status
 * @param self
 * @param appid
 * @param openId
 * @constructor
 */
export const CheckLogin = (self, appid, openId) => {
  const params = {
    key: appid,
    openid: openId
  }
  AuthPost('/WeChat/CheckLogin', params).then((res) => {
    self.isLoading = false
    if (res.code === 200) { // 已登录
      const token = res.data.token
      self.global.header.Authorization = 'Bearer ' + token
      Set(appid, 'openid', openId)
      Set(openId, 'token', token)
      Set(openId, 'user', res.data)
      Set(openId, 'cars', res.data.cars)
      Set(openId, 'card', res.data.card)
      self.isRouter = true
      // currentPage(self)
    }
  })
}

/**
 * page jump
 * @param self
 * @returns {boolean}
 */
export const currentPage = (self) => {
  const path = self.$route.path // 当前链接
  if (path === '/') {
    self.$router.push('/Index.vue')
  } else if (path === '/Index.vue') {
    return false
  } else {
    self.$router.push({ path: path })
  }
}

/**
 * get user's infos
 * @param self
 * @constructor
 */
export const GetUserInfo = async (self) => {
  let appid, openid
  if (getUrlKey('id') || getUrlKey('key')) { // url上带appid值
    let appid = getUrlKey('id')
    localStorage.setItem('appid', appid) // 保存当前的appid
    if (Get(appid, 'appid') === appid) {
      appid = Get(appid, 'appid')
      openid = Get(appid, 'openid')
      makeApi(Get(appid, 'api'))
      if (!openid) {
        GetWxOpenId(self, appid)
      } else {
        CheckLogin(self, appid, openid)
      }
    } else { // 本地没有当前链接上的appid值
      Set(appid, 'appid', appid)
    }
  } else { // url上没有带appid
    appid = Get('', 'appid') // 获取默认的appid
    openid = Get(appid, 'openid')
    makeApi('app', Get(appid, 'api'))
    setTimeout(() => {
      CheckLogin(self, appid, openid)
    }, 400)
  }
}

/**
 * 公众号链接直接点击进入页面时请求
 * @param self
 * @constructor
 */
export const UpdateData = (self) => {
  const appid = getUrlKey('id')
  if (appid && (appid === Get(appid, 'appid'))) {
    Get('appid', appid)
    const openid = GetOpenid()
    Remove(openid, 'cars')
    Remove(openid, 'user')
    Remove(openid, 'card')
    Remove(appid, 'areas')
    self.$store.commit('setDefaultAddress', null)
    localStorage.setItem('appid', appid)
  }
  GetUserInfo(self)
}
export default {
  GetOpenid,
  GetAppid,
  SetToken,
  header
}
