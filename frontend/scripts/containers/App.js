import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import Menu from '../components/Menu'
import Modal from '../components/Modal'
import { trackPageView } from '../utils/tracking'

const App = class App extends Component {
  componentDidUpdate (prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      trackPageView()
    }
  }
  render () {
    const {children} = this.props

    return (
      <div className='app'>
        {/* NOTE: Helmet lib content goes into <head> tags */}
        <Helmet
          title='Snips Sdk Docs'
          meta={[
            { property: 'og:site_name', content: 'Snips' },
            { property: 'twitter:site', content: '@snips' },
            { property: 'twitter:creator', content: '@snips' },
            { property: 'og:title', content: 'Snips Sdk Docs' },
            { property: 'og:description', content: 'All the doc you need for the snips sdk' },
            { property: 'description', content: 'All the doc you need for the snips sdk' },
            { property: 'twitter:card', content: 'summary_large_image' },
            // { property: 'og:image', content: shareImg },
            { property: 'og:image:width', content: '2400' },
            { property: 'og:image:height', content: '1260' }
          ]}
        />
        <Header />
        <Menu />

        {children}

        <Modal />

      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
}

export default connect(null)(App)
