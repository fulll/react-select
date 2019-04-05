import React, { Fragment } from 'react'

import onOptionScroll from '../helpers/optionScroll'
import { OptionFooter, OptionHeader } from './HeaderFooter'
import OptionDisplay from './OptionsDisplay'

import { OptionsContainer } from '../Styled'

const Options = ({
  options,
  forceHeader,
  Header,
  noResult,
  handleValue,
  selected,
  forceFooter,
  Footer,
  width,
  maxHeight,
  reachedBottom,
  reachedTop,
}) => {
  return (
    <Fragment>
      <OptionsContainer
        innerRef={options => {
          this.options = options
        }}
        width={width}
        maxHeight={maxHeight}
        onScroll={onOptionScroll(reachedBottom, reachedTop)}
      >
        <OptionHeader
          options={options}
          forceHeader={forceHeader}
          Header={Header}
        />
        <OptionDisplay
          options={options}
          noResult={noResult}
          handleValue={handleValue}
          selected={selected}
        />
        <OptionFooter
          options={options}
          forceFooter={forceFooter}
          Footer={Footer}
        />
      </OptionsContainer>
    </Fragment>
  )
}

export default Options
