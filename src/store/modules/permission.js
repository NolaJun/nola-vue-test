import { asyncRoutes, baseRoutes } from '../../router';

/**
 * Use meta.role to determine if the current user has permission
 * @param menus
 * @param route
 */
function hasPermission(menus, route) {
  let flag = false;
  if (route.name) {
    flag = menus.some(menu => menu === route.name);
    return flag;
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param menus
 */
export function filterAsyncRoutes(routes, menus) {
  let res = [];
  routes.forEach(route => {
    let tmp = { ...route };
    if (hasPermission(menus, tmp) || tmp.name === 'Index') {
      res.push(tmp);
    }
  });
  return res;
}

const state = {
  routes: [],
  addRoutes: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = baseRoutes.concat(routes);
  }
};

const actions = {
  generateRoutes({ commit }, menus) {
    return new Promise(resolve => {
      let routes = filterAsyncRoutes(asyncRoutes, menus);
      commit('SET_ROUTES', routes);
      resolve(routes);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
