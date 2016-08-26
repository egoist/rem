<template>
  <div class="app-input">
    <input type="text" @input="handleInput" v-model="input">
    <img src="" alt="">
  </div>
</template>

<script>
  import plugin from 'utils/plugin'
  import {ipcRenderer} from 'electron'

  plugin.addPlugin({
    trigger: 'demo',
    handler(input) {
      if (input) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve([
              {title: 'wow', subtitle: 'cool'},
              {title: 'wow', subtitle: 'cool'},
              {title: 'wow', subtitle: 'cool'},
              {title: 'wow', subtitle: 'cool'},
              {title: 'wow', subtitle: 'cool'},
              {title: 'wow', subtitle: 'cool'},
              {title: 'wow', subtitle: 'cool'},
              {title: 'wow', subtitle: 'cool'}
            ])
          }, 2000)
        })
      }
      return [
        {
          title: 'demo',
          subtitle: 'subtitle',
          action: {
            type: 'open-url',
            url: 'http://github.com/egoist/rem'
          }
        }
      ]
    }
  })

  export default {
    data() {
      return {
        loading: false,
        input: ''
      }
    },
    methods: {
      handleInput() {
        const input = this.input
        if (!input) {
          this.$store.dispatch('setData', [])
          return
        }

        const result = plugin.runPlugin(input)
        if (result) {
          if (result.then) {
            result.then(data => {
              this.$store.dispatch('setData', data)
            })
          } else {
            this.$store.dispatch('setData', result)
          }
        }
      }
    }
  }
</script>

<style>
.app-input {
  display: flex;
  height: 75px;
  border-bottom: 1px solid #e5eaea;
  input {
    height: 100%;
    outline: none;
    font-size: 2.2rem;
    font-weight: 300;
    border: none;
    background-color: transparent;
    padding: 10px 15px;
    width: calc(100% - 80px);
  }
}
</style>