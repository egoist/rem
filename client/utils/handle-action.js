import switchy from 'switchy'
import actions from './actions'

export default action => {
  switchy({
    'open-url'() {
      actions.open(action.url)
    },
    default() {
      console.log('unknown action', action)
    }
  })(action.type)
}