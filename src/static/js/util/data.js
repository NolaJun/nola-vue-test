import { Set } from './storage'
/**
 * 获取对象的第一个属性
 * @param obj
 * @return {*}
 */
export const firstObj = obj => {
  for (let k in obj) {
    if (Object.prototype.call().hasOwnProperty(k)) return obj[k]
    // if (obj.hasOwnProperty(k)) return obj[k]
  }
}
/**
 * 数据深拷贝
 * @param obj
 * @returns {any}
 */
export const deepCopy = obj => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * get url's params
 * @param name
 * @returns {string}
 */
export const getUrlKey = name => {
  let z =
    decodeURIComponent(
      (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(
        location.href
      ) || [null, ''])[1].replace(/\+/g, '%20')
    ) || null
  if (name === 'id') Set('', 'appid', z)
  return z
}
export default {
  deepCopy,
  firstObj,
  getUrlKey
}
