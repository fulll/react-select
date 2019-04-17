import React, { Fragment } from 'react'

import Option from './Option'
import { DefaultOption, DefaultNoResult } from '../DefaultComponents'

const OptionsDisplay = ({
  options,
  noResult,
  handleValue,
  selected,
  CustomOption,
  CustomNoResult,
}) => (
  <Fragment>
    {options &&
      options.map((item, i) => (
        <Option
          selected={selected === i + 1}
          key={item.value}
          handleClick={() => !item.disabled && handleValue(item)}
        >
          {CustomOption ? (
            CustomOption({ item })
          ) : (
            <DefaultOption item={item} />
          )}
        </Option>
      ))}
    {noResult && (CustomNoResult ? CustomNoResult() : <DefaultNoResult />)}
  </Fragment>
)

export default OptionsDisplay
