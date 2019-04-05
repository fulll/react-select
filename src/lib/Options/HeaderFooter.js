import React, { Fragment } from 'react'

export const OptionHeader = ({ Header, options, forceHeader }) => (
  <Fragment>
    {Header && (options.length !== 0 || forceHeader) && <Header />}
  </Fragment>
)

export const OptionFooter = ({ Footer, options, forceFooter }) => (
  <Fragment>
    {Footer && (options.length !== 0 || forceFooter) && <Footer />}
  </Fragment>
)
