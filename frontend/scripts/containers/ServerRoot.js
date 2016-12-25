import React from 'react'
import { Provider } from 'react-redux'

import App from './App'

const ServerRoot = ({store, appProps}) => (
  <Provider store={store}>
    <App {...appProps} />
  </Provider>
)

export default ServerRoot
