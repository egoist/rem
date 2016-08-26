import find from 'lodash.find'
import store from 'root/store'
import actions from 'utils/actions'

class Plugin {
  constructor() {
    this.plugins = []
  }

  addPlugin(plugin) {
    this.plugins.push(plugin)
  }

  runPlugin(trigger) {
    const parsed = trigger.match(/(\w+)\s?(\w*)/) || []
    const plugin = find(this.plugins, {trigger: parsed[1]})
    if (plugin && typeof plugin.handler === 'function') {
      return plugin.handler(parsed[2])
    }
  }
}

export default new Plugin()