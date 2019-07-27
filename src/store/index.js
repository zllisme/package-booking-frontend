import Vuex from 'vuex'

import Vue from 'vue'

import actions from './actions'

import mutations from './mutations'

import getters from './getters'

Vue.use(Vuex)

const state = {
  packageList: Array
}

export default new Vuex.Store({

  state,

  getters,

  actions,

  mutations
})
