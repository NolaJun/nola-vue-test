import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const getters = {
  api: state => state.app.api,
  saving: state => state.app.saving,
  permission_routes: state => state.permission.routes,
  alert_mark: state => state.alert.mark,
  alert: state => state.alert.alert,
  token: state => state.user.token,
  menus: state => state.user.menus
}

export default new Vuex.Store({
  modules,
  getters
})
