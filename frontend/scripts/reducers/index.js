import { combineReducers } from 'redux'

import menu from './menu'
import modal from './modal'

const rootReducer = combineReducers({
  menu,
  modal
})

export default rootReducer
