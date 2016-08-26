import Vue from 'vue'
import App from './components/App'
import store from './store'

const app = new Vue({
  store,
  ...App
})

export {app, store}