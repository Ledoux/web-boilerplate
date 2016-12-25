import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import Link from './Link'
import { showModal } from '../reducers/modal'
import { closeMenu } from '../reducers/menu'
import { links } from '../utils/constants'

const Menu = ({isShowingMenu, closeMenu, showModal}) => {
  const classes = classnames({
    'menu--showing': isShowingMenu
  }, 'menu')
  return (
    <div className={classes} onClick={closeMenu}>
      <nav className='menu__list px2 py1' onClick={e => {
        e.nativeEvent.stopImmediatePropagation() // Prevent click bubbling and closing modal
        e.stopPropagation()
      }}>
        {links.map(({
          external,
          isNew,
          forceAnchorElement,
          label,
          path,
          target
          }, idx) => {
          const activePage = path === window.location.pathname
          const menuItemClasses = classnames({
            'menu__item--active': activePage,
            'menu__item--new': isNew
          }, 'block py2 menu__item menu__list-item-content')
          return (
            <div
              className='menu__item-container'
              key={idx}
            >
              <Link
                className={menuItemClasses}
                external={external}
                href={path}
                target={target}
                forceAnchorElement={forceAnchorElement}
              >
                {label}
              </Link>
            </div>
          )
        })}
      </nav>
    </div>
  )
}

Menu.propTypes = {
  closeMenu: PropTypes.func.isRequired
}

const mapStateToProps = ({ menu: { isShowingMenu } }) => {
  return { isShowingMenu }
}

export default connect(mapStateToProps, { closeMenu, showModal })(Menu)
