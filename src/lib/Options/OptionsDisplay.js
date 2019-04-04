import React, { Fragment } from 'react'

import Option from './Option'
import { CustomOption, CustomNoResult } from '../CustomComponents'

const OptionsDisplay = ({ options, noResult, handleValue, selected }) => {
  return (
    <Fragment>
      {options.length !== 0
        ? options.map((item, i) => (
            <Option
              selected={selected === i + 1}
              key={item.value}
              onClick={item.disabled ? undefined : () => handleValue(item)}
            >
              <CustomOption item={item} />
            </Option>
          ))
        : noResult && <CustomNoResult />}
    </Fragment>
  )
}

export default OptionsDisplay
