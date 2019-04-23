import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    config: {
      apiKey: "AIzaSyCRRJKu8HxX22Ql0gG-oL00QhBZGLPjUi8",
      authDomain: "faturatakip-7fb50.firebaseapp.com",
      databaseURL: "https://faturatakip-7fb50.firebaseio.com",
      projectId: "faturatakip-7fb50",
      storageBucket: "faturatakip-7fb50.appspot.com",
      messagingSenderId: "72476703654"
    },
    authUser: null,
    token: false,
    createForm: null
  },
  mutations: {
    SET_AUTH_USER(state, user) {
      state.authUser = user
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_CREATE_FORM(state, form) {
      state.createForm = form
    }
  },
  actions: {
    setAuthUser({ commit }, user) {
      commit('SET_AUTH_USER', user)
    },
    setToken({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    setCreateForm({ commit }, form) {
      commit('SET_CREATE_FORM', form)
    }
  },
  getters: {
    getConfig(state) {
      return state.config
    },
    getAuthUser(state) {
      return state.authUser
    },
    getToken(state) {
      return state.token
    },
    getCreateForm(state) {
      return state.createForm
    }
  }
})
