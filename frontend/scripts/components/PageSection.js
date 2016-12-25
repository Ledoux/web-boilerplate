import React, { PropTypes } from 'react'
import classnames from 'classnames'

const PageSection = ({
  beforeSection,
  children,
  dataBackgroundColor,
  extraClass,
  first,
  id,
  quilt
}) => {
  const classes = classnames({
    'page-section--first': first,
    'page-section--quilt': quilt
  }, 'page-section', extraClass)
  return (
    <section id={id} className={classes} data-background-color={dataBackgroundColor}>
      <div className='page-section__inner'>
        {beforeSection &&
          <div className='page-section__between-sections'>{beforeSection}</div>
        }
        {children}
      </div>
    </section>
  )
}

PageSection.propTypes = {
  beforeSection: PropTypes.node,
  children: PropTypes.node.isRequired,
  dataBackgroundColor: PropTypes.string,
  extraClass: PropTypes.string,
  id: PropTypes.string,
  first: PropTypes.bool,
  quilt: PropTypes.bool

}

export default PageSection
