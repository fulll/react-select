import React, { Fragment } from 'react'

export const OptionHeader = ({ Header, options, forceHeader }) => {
  return (
    <Fragment>
      {Header && (options.length !== 0 || forceHeader) && <Header />}
    </Fragment>
  )
}

export const OptionFooter = ({ Footer, options, forceFooter }) => {
  return (
    <Fragment>
      {Footer && (options.length !== 0 || forceFooter) && <Footer />}
    </Fragment>
  )
}
