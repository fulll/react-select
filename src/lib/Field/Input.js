import React from 'react'

import { Input } from '../Styled'

const InputField = ({
  noFilter,
  filterText,
  name,
  handleFocus,
  innerRef,
  placeholder,
  minWidth,
  handleChange,
}) => (
  <Input
    disabled={noFilter}
    innerRef={innerRef}
    onChange={handleChange}
    value={filterText}
    name={name}
    onFocus={handleFocus}
    placeholder={placeholder}
    minWidth={minWidth}
  />
)

export default InputField
