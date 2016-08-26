<template>
  <div class="app-input">
    <input
      type="text"
      @input="handleInputWithDebounce"
      @keydown.up.prevent="handleMoveUp"
      @keydown.down.prevent="handleMoveDown"
      @keydown.enter.prevent="handleEnter"
      v-model="input">
    <img src="" alt="">
  </div>
</template>

<script>
  import plugin from 'utils/plugin'
  import {ipcRenderer} from 'electron'
  import debounce from 'lodash.debounce'
  import {mapActions, mapGetters} from 'vuex'
  import handleAction from 'utils/handle-action'

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

  plugin.addPlugin({
    trigger: 'npm',
    handler(input) {
      return fetch(`https://api.npms.io/search?term=${input}&size=20`)
        .then(data => data.json())
        .then(data => {
          if (data.code) {
            return [
              {
                title: data.code,
                subtitle: data.message
              }
            ]
          } else {
            const {total, results} = data
            if (total === 0) {
              return [
                {
                  title: 'Not Found',
                  subtitle: 'This module has not been registered on npm.'
                }
              ]
            }
            return results.map(item => ({
              title: item.module.name,
              subtitle: item.module.description,
              action: {
                type: 'open-url',
                url: item.module.links.repository || item.module.links.npm
              }
            }))
          }
        })
    }
  })

  export default {
    data() {
      return {
        loading: false,
        input: ''
      }
    },
    computed: {
      ...mapGetters(['activeItem'])
    },
    methods: {
      ...mapActions(['moveUp', 'moveDown', 'moveTo']),
      handleInputWithDebounce() {
        debounce(this.handleInput, 600)()
      },
      handleInput() {
        const input = this.input
        if (!input) {
          this.$store.dispatch('setData', [])
          return
        }

        this.moveTo(0)

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
      },
      handleMoveUp() {
        if (this.activeItem) {
          this.moveUp()
        }
      },
      handleMoveDown() {
        if (this.activeItem) {
          this.moveDown()
        }
      },
      handleEnter() {
        if (this.activeItem) {
          handleAction(this.activeItem.action)
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