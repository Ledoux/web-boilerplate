import classnames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'

import HamburgerButton from './HamburgerButton'
import Link from './Link'
import { showModal } from '../reducers/modal'
import { links } from '../utils/constants'

const Header = ({
  darkHeaderBackground
}) => (<header className='header'>
  <div className='header__top-nav flex items-center relative'>
    {/* all these routes are actually external except developers */}
    <div className='header__top-nav__hamburger sm-hide md-hide lg-hide'>
      <HamburgerButton onTopOfDarkSection />
    </div>
    <div className='xs-hide'>
      {links.map(({external, extraClass, label, path}, index) => {
        return (<Link
          className={classnames('header__top-nav__link py2 mr3',
            extraClass)}
          key={index}
          {...{href: path, external}} >
            {label}
        </Link>) })}
    </div>
  </div>
</header>)

export default connect(null, { showModal })(Header)
