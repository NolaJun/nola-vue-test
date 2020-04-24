import { GetOpenid } from '../../../static/js/global/global';
import storage from '../../../static/js/util/storage';
const state = {
  token: {
    access_token:
      storage && storage.Get(GetOpenid(), 'token')
        ? storage.Get(GetOpenid(), 'token').access_token
        : '',
    expire_in:
      storage && storage.Get(GetOpenid(), 'token')
        ? storage.Get(GetOpenid(), 'token').expire_in
        : 0
    // access_token: '',
    // expire_in: 0
  },
  // menus: [],
  // rules: []
  menus: storage && storage.Get('', 'menus') ? storage.Get('', 'menus') : [],
  rules: storage && storage.Get('', 'rules') ? storage.Get('', 'rules') : [],
  user:
    storage && storage.Get(GetOpenid(), 'user')
      ? storage.Get(GetOpenid(), 'user')
      : null,
  orgId: 0,
  guest: 1
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token.access_token = token.access_token;
    state.token.expire_in = token.expire_in;
    storage.Set(GetOpenid(), 'token', token);
  },
  CLEAR_TOKEN: state => {
    state.token.access_token = '';
    state.token.expire_in = 0;
    storage.Remove('', 'token');
  },
  SET_MENU: (state, menus) => {
    state.menus = menus;
    storage.Set('', 'menus', menus, 0);
  },
  CLEAR_MENU: state => {
    state.menus = [];
    storage.Remove('', 'menus');
  },
  SET_GUEST: (state, guest) => {
    state.guest = guest;
  },
  SET_ORGID: (state, orgId) => {
    state.orgId = orgId;
  },
  SET_SHOP: (state, shop) => {
    state.shop = shop;
  },
  SET_USER: (state, user) => {
    state.user = user;
    storage.Set(GetOpenid(), 'user', user, 0);
  },
  SET_RULE: (state, rules) => {
    state.rules = rules;
    storage.Set('', 'rules', rules, 0);
  },
  CLEAR_RULE: state => {
    state.rules = [];
    storage.Remove('', 'rules');
  }
};

const actions = {
  setToken({ commit }, token) {
    commit('SET_TOKEN', token);
  },
  clearToken({ commit }) {
    commit('CLEAR_TOKEN');
  },
  setMenu({ commit }, menus) {
    commit('SET_MENU', menus);
  },
  clearMenu({ commit }) {
    commit('CLEAR_MENU');
  },
  setGuest({ commit }, guest) {
    commit('SET_GUEST', guest);
  },
  setOrgId({ commit }, user) {
    commit('SET_ORGID', user);
  },
  setShop({ commit }, shop) {
    commit('SET_SHOP', shop);
  },
  clearShop({ commit }) {
    commit('SET_SHOP');
  },
  clearUser({ commit }) {
    commit('SET_USER');
  },
  setUser({ commit }, user) {
    commit('SET_USER', user);
  },
  setRule({ commit }, rules) {
    commit('SET_RULE', rules);
  },
  clearRule({ commit }) {
    commit('CLEAR_RULE');
  },
  logout({ commit }) {
    // 退出清除token,权限，规则
    commit('CLEAR_TOKEN');
    commit('CLEAR_MENU');
    commit('CLEAR_RULE');
    commit('CLEAR_USER');
    commit('CLEAR_SHOP');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
