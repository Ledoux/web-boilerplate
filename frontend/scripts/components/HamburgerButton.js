import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { closeMenu, showMenu } from '../reducers/menu'

import Link from './Link'

const HamburgerButton = ({
  active,
  onTopOfDarkSection,
  closeMenu,
  showMenu}) => {
  const classes = classnames({
    'hamburger--active': active,
    'hamburger--on-dark-bg': onTopOfDarkSection
  }, 'hamburger')
  return (
    <Link
      href='#footer'
      className={classes}
      onClick={e => {
        e.preventDefault()
        if (!active) {
          showMenu()
        } else {
          // For keyboard users.
          // Not used for mouseclicks, instead we capture clicks via dismiss overlay
          closeMenu()
        }
      }}
    >
      <div className='hamburger-box'>
        <div className='hamburger-inner'>
        </div>
      </div>
    </Link>
  )
}

HamburgerButton.propTypes = {
  active: PropTypes.bool.isRequired,
  onTopOfDarkSection: PropTypes.bool,
  closeMenu: PropTypes.func.isRequired,
  showMenu: PropTypes.func.isRequired
}

const mapStateToProps = ({ menu: { isShowingMenu } }) => {
  return {
    active: isShowingMenu
  }
}

export default connect(mapStateToProps, {closeMenu, showMenu})(HamburgerButton)
