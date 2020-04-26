import storage from '../../static/js/util/storage'
import { GetAppid } from '../../static/js/global/global'

const state = {
  api: '',
  saving: {
    mark: '',
    status: false
  }
}

const mutations = {
  SET_API: (state, api) => {
    state.api = api
    storage.Set(GetAppid(), 'api', api)
  },
  START_SAVING: (state, mark) => {
    state.saving.mark = mark
    state.saving.status = true
  },
  END_SAVING: state => {
    state.saving.mark = ''
    state.saving.status = false
  }
}

const actions = {
  setApi({ commit }, api) {
    commit('SET_API', api)
  },
  startSaving({ commit }, mark) {
    commit('START_SAVING', mark)
  },
  endSaving({ commit }) {
    commit('END_SAVING')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
