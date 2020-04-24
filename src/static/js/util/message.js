import { Toast, Dialog } from 'vant'
import { transform } from './vuei18n'
import { Remove } from './storage'
import { GetOpenid } from '../global/global'
import router from '../../../src/router'

export const errorResponse = error => {
  let response = {}
  if (error.hasOwnProperty('response')) {
    response = error.response.data
    response.status = 'error'
    if (Object.prototype.hasOwnProperty.call(response, 'code'))
      response.code = error.response.status
    // if (!response.hasOwnProperty('code')) response.code = error.response.status;
    if (response.message === '') response.message = 'error.network'
  } else {
    response.message = 'error.network'
    response.code = 404
    response.status = 'error'
  }
  responseRoute(response, 'error')
}

export const responseRoute = (response, type = 1) => {
  switch (response.code) {
    case 200:
    case 201:
    case 400:
      if (Object.prototype.hasOwnProperty.call(response, 'message')) {
        // if (response.hasOwnProperty('message')) {
        if (type === 1) {
          return notify(response.message)
        } else if (type === 2) {
          console.log(router)
          router.push({ path: '/Login' })
        } else return message(response.message, response.status)
      }
      break
    case 404:
      if (response.hasOwnProperty('message'))
        return message(response.message, type)
      break
    case 422:
      if (
        response.hasOwnProperty('errors') &&
        response.hasOwnProperty('message')
      ) {
        return alertBox(response.errors[0])
      }
      break
    case 401:
      return alertBox('login.expired', 'login.expired_title', () => {
        Remove(GetOpenid(), 'user')
        Remove(GetOpenid(), 'token')
        router.replace({
          path: '/Login',
          components: () => import('@/views/Login/Index.vue')
        })
      })
  }
}

export const Loading = (message = '', title = '', times = 2000) => {
  Toast.loading({
    title: transform(title),
    message: transform(message),
    forbidClick: true,
    duration: times
  })
}

export const notify = (message, type = 'text', title = 'tip.sweet_tip') => {
  console.log(transform(message))
  Toast({
    title: transform(title),
    message: transform(message),
    forbidClick: true,
    type: type,
    showClose: true,
    offset: 30,
    duration: 3000
  })
}

export const message = (message, type = 'error') => {
  Toast({
    showClose: true,
    message: transform(message),
    type: type
  })
}

/**
 * 弹窗带确定按钮
 * @param message
 * @param title
 * @param action
 */
export const alertBox = (
  message,
  title = 'tip.sweet_tip',
  actions = () => {}
) => {
  Dialog.alert({
    message: transform(message),
    confirmButtonText: transform('button.confirm'),
    title: transform(title)
  }).then(() => {
    actions && actions()
  })
}
export const confirmBox = (
  message,
  title = 'tip.sweet_tip',
  color = '#ff7a45',
  success = () => {},
  cancel = () => {}
) => {
  Dialog.confirm({
    title: transform(message),
    confirmButtonText: transform('button.Confirm'),
    confirmButtonColor: color,
    message: transform(title)
  })
    .then(() => {
      // on confirm
      success && success()
    })
    .catch(() => {
      // on cancel
      cancel && cancel()
    })
}

export default {
  responseRoute,
  Loading,
  alertBox,
  confirmBox,
  notify
}
