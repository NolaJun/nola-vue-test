import { transformApp, transformDistrict, transformCommon, transformUnit } from './cn/app.js'
import { transformRegister, transformLogin } from './cn/login.js'
import {description, required, success, tip, unique, message, error, transformButton, status} from './cn/message'
import {transformOrg, transformUpload, transformApply, transformInvite} from './cn/org'
import { language, menu } from './cn/menu'
import {transformCar, customer, extention, feedback, meal, Mine, shop, wallet} from './cn/customer'
import operation from './cn/button'
import { coupon, transformShare, transformShareUrl } from './cn/share'
import { transformMall, transformOrder, transformSecKill } from './cn/mall'
import game from './cn/game'
import {transformReservation} from './cn/reservation'
export default {
  app: transformApp,
  register: transformRegister,
  mall: transformMall,
  seckill: transformSecKill,
  employee: transformLogin,
  org: transformOrg,
  upload: transformUpload,
  apply: transformApply,
  invite: transformInvite,
  button: transformButton,
  language: language,
  feedback: feedback,
  operation: operation,
  wallet: wallet,
  extention: extention,
  Mine: Mine,
  share: transformShare,
  coupon: coupon,
  common: transformCommon,
  unit: transformUnit,
  district: transformDistrict,
  order: transformOrder,
  meal: meal,
  shop: shop,
  car: transformCar,
  menu: menu,
  transformShareUrl: transformShareUrl,
  game: game,
  reservation: transformReservation,
  customer: customer,
  login: transformLogin,
  error: error,
  description: description,
  status: status,
  required: required,
  confirm: confirm,
  tip: tip,
  message: message,
  success: success,
  unique: unique
}
