const state = {
  mark: '',
  alert: {
    type: 'error',
    show: false,
    content: ''
  }
}

const mutations = {
  SET_MARK: (state, mark) => {
    state.mark = mark
  },
  SHOW_ALERT: (state, content, type = 'error') => {
    state.alert.type = type
    state.alert.content = content
    state.alert.show = true
  },
  CLEAR_ALERT: state => {
    state.alert.type = 'error'
    state.alert.content = ''
    state.alert.show = false
  }
}

const actions = {
  setMark({ commit }, mark) {
    commit('SET_MARK', mark)
    commit('CLEAR_ALERT')
  },
  showAlert({ commit }, content, type = 'error') {
    commit('SHOW_ALERT', content, type)
  },
  clearAlert({ commit }) {
    commit('CLEAR_ALERT')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
