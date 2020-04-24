import axios from 'axios'
import qs from 'qs'
import { Get } from './storage'
import store from '../../../src/store'
import { GetAppid, GetOpenid } from '../global/global'
// import { errorResponse } from './message'
import { errorResponse, responseRoute } from './message'

let http = {
  master: 'https://devplatform.kgjsoft.com/',
  local: 'http://api.admin.kgj.com/'
}

export const makeApi = (k, val) => {
  http[k] = 'https://' + val
  store.dispatch('app/setApi', http)
}
/**
 * 获取对应的api地址
 * @returns {string}
 */
export const getApiUrl = () => {
  let host = document.domain
  if (
    host === 'localhost' ||
    host === 'admin.crm.com' ||
    host === 'localhost:8081'
  ) {
    // return http.local
    if (Get(GetAppid(), 'https')) http = Get(GetAppid(), 'https')
    if (Get('', 'api')) return http.local
    else return http.master
  } else {
    if (Get('', 'https')) return http.app
    else return http.master
  }
}

/**
 * 登陆接口请求api
 * @param config
 * @returns {AxiosPromise}
 */
export function ajaxPost(url, params) {
  // 创建axios实例
  axios.defaults.baseURL = getApiUrl()
  axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded;charset=UTF-8' // 请求头
  // 发送真正的网络请求
  return apiPost(url, params)
}

/**
 * 非后台数据API获取带token
 * @param url
 * @param params
 * @returns {Promise<unknown>}
 */
export function AuthPost(url, params) {
  axios.defaults.baseURL = getApiUrl()
  axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded;charset=UTF-8' // 请求头
  axios.defaults.headers.post.Accept = 'application/json'
  let token = Get(GetOpenid(), 'token')
    ? Get(GetOpenid(), 'token').access_token
    : ''
  axios.defaults.headers.post.Authorization = token
  // 创建axios实例
  return apiPost(url, qs.stringify(params))
}
/**
 * @param url
 * @param params
 * @return {Promise<unknown>}
 */
export const apiPost = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(response => {
        if (response.data.code === 200) {
          resolve(response.data)
        } else {
          if (url === '/Employee/AutoLogin') {
            responseRoute(response.data, 2)
            // router.push({ path: '/Login' })
          } else {
            responseRoute(response.data)
          }
        }
      })
      .catch(error => {
        errorResponse(error)
        reject(error)
      })
  })
}
/**
 * @param url
 * @param params
 * @return {Promise<unknown>}
 */
export const uploadPost = (url, params = {}) => {
  axios.defaults.baseURL = getApiUrl()
  axios.defaults.headers.post['Content-Type'] = 'multipart/form-data;'
  let token = Get(GetOpenid(), 'token')
    ? Get(GetOpenid(), 'token').access_token
    : ''
  axios.defaults.headers.post.Authorization = token
  return apiPost(url, params)
}

export default {
  uploadPost,
  ajaxPost,
  AuthPost,
  makeApi,
  apiPost
}
