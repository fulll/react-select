import React from 'react'

export const OptionHeader = ({ Header, options, forceHeader }) =>
  Header && (options.length !== 0 || forceHeader) ? <Header /> : null

export const OptionFooter = ({ Footer, options, forceFooter }) =>
  Footer && (options.length !== 0 || forceFooter) ? <Footer /> : null
