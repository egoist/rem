import Vue from 'vue'
import Vuex from 'vuex'
import {ipcRenderer} from 'electron'

Vue.use(Vuex)

const state = {
  data: []
}

const mutations = {
  SET_DATA(state, data) {
    state.data = data
  }
}

const actions = {
  setData({commit}, data) {
    commit('SET_DATA', data)
    console.log(data.length > 5 ? 5 : data.length * 70 + 75)
    ipcRenderer.send('resize', {
      height: (data.length > 5 ? 5 : data.length) * 70 + 75
    })
  }
}

const getters = {
  items: state => state.data
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store