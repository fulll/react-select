import React, { Fragment } from 'react'

import { onOptionScroll } from '../helpers/optionScroll'

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
  preventParentScroll,
  reachedBottomProp,
  reachedBottom,
}) => {
  return (
    <Fragment>
      <OptionsContainer
        innerRef={options => {
          this.options = options
        }}
        width={width}
        maxHeight={maxHeight}
        onWheel={e =>
          onOptionScroll(
            e,
            this.options,
            preventParentScroll,
            reachedBottomProp,
            reachedBottom,
          )
        }
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
