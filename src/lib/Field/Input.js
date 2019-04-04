import React from 'react'

import { Input } from '../Styled'

const InputField = ({
  noFilter,
  filterText,
  name,
  focus,
  innerRef,
  placeholder,
  minWidth,
  handleChange,
}) => {
  return (
    <Input
      disabled={noFilter}
      innerRef={innerRef}
      onChange={handleChange}
      value={filterText}
      name={name}
      onFocus={focus}
      placeholder={placeholder}
      minWidth={minWidth}
    />
  )
}

export default InputField
