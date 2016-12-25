import React, { Component } from 'react'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Router, useRouterHistory } from 'react-router'
import { createHistory } from 'history'

import routes from '../utils/routes'
import { IS_NODE, BASE_NAME } from '../utils/config'

// By default, this client will send queries to the
//  `/graphql` endpoint on the same host
const client = new ApolloClient()

export const browserHistory = IS_NODE ? undefined : useRouterHistory(createHistory)({
  basename: BASE_NAME
})

const Root = class Root extends Component {
  componentDidMount () {
    this._unlisten = browserHistory.listen(location => {
      // FROM: https://github.com/reactjs/react-router/issues/2144#issuecomment-150939358
      // Use setTimeout to make sure this runs after React Router's own listener
      setTimeout(() => {
        // Keep default behavior of restoring scroll position when user:
        // - clicked back button
        // - clicked on a link that programmatically calls `history.goBack()`
        // - manually changed the URL in the address bar (here we might want
        // to scroll to top, but we can't differentiate it from the others)
        if (location.action === 'POP') {
          return
        }
        // In all other cases, scroll to top
        window.scrollTo(0, 0)
      })
    })
  }
  componentWillUnmount () {
    if (typeof this._unlisten === 'function') {
      this._unlisten()
    }
  }

  render () {
    return (
      <ApolloProvider store={this.props.store} client={client}>
        <Router history={browserHistory} children={routes} />
      </ApolloProvider>
    )
  }
}

export default Root
