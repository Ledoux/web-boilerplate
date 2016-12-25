import assign from 'lodash.assign'

import { trackEvent } from '../utils/tracking'

export const SHOW_MENU = 'SHOW_MENU'
export const CLOSE_MENU = 'CLOSE_MENU'

const intialState = {
  isShowingMenu: false
}

export default function menu (state = intialState, action) {
  switch (action.type) {
    case SHOW_MENU:
      return assign({}, state, {
        isShowingMenu: true
      })
    case CLOSE_MENU:
      return assign({}, state, {
        isShowingMenu: false
      })
    default:
      return state
  }
}

export function closeMenu () {
  trackEvent('closeMenu')
  return { type: CLOSE_MENU }
}

export function showMenu () {
  trackEvent('showMenu')
  return { type: SHOW_MENU }
}
