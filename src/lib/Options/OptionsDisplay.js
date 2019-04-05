import React from 'react'

import Option from './Option'
import { CustomOption, CustomNoResult } from '../CustomComponents'

const OptionsDisplay = ({ options, noResult, handleValue, selected }) =>
  options.length !== 0
    ? options.map((item, i) => (
        <Option
          selected={selected === i + 1}
          key={item.value}
          handleClick={() => !item.disabled && handleValue(item)}
        >
          <CustomOption item={item} />
        </Option>
      ))
    : noResult && <CustomNoResult />

export default OptionsDisplay
