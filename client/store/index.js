import Vue from 'vue'
import Vuex from 'vuex'
import {ipcRenderer} from 'electron'
import {$} from 'utils/dom'

Vue.use(Vuex)

const state = {
  data: [],
  active: 0
}

const mutations = {
  SET_DATA(state, data) {
    state.data = data
  },
  MOVE_DOWN(state) {
    if (state.active === state.data.length - 1) {
      state.active = 0
    } else {
      state.active++
    }
  },
  MOVE_UP(state) {
    if (state.active === 0) {
      state.active = state.data.length - 1
    } else {
      state.active--
    }
  },
  MOVE_TO(state, index) {
    state.active = index
  }
}

const actions = {
  setData({commit}, data) {
    commit('SET_DATA', data)
    console.log(data.length > 5 ? 5 : data.length * 70 + 75)
    ipcRenderer.send('resize', {
      height: (data.length > 5 ? 5 : data.length) * 70 + 75
    })
  },
  moveDown({commit}) {
    commit('MOVE_DOWN')
    setTimeout(() => {
      $('.item.active').scrollIntoViewIfNeeded()
    }, 0)
  },
  moveUp({commit}) {
    commit('MOVE_UP')
    setTimeout(() => {
      $('.item.active').scrollIntoViewIfNeeded()
    }, 0)
  },
  moveTo({commit}, index) {
    commit('MOVE_TO', index)
    setTimeout(() => {
      if ($('.item.active'))
        $('.item.active').scrollIntoViewIfNeeded()
    }, 0)
  }
}

const getters = {
  items: state => state.data,
  showMain: state => state.data && state.data.length > 0,
  activeItemIndex: state => state.active,
  activeItem: state => state.data[state.active]
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store