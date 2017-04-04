import { createStore, combineReducers } from 'redux'

function currentUser (state = null, action) {
  switch (action.type) {
    case 'SIGNED_IN':
      return action.payload
    case 'SIGNED_OUT':
      return null
    default:
      return state
  }
}

const reducer = combineReducers({
  currentUser
})

export default createStore(reducer)
