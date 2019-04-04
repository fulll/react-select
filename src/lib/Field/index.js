import React from 'react'

import Input from './Input'
import { CustomTag } from '../CustomComponents'

import { FieldContainer, TextContainer, Arrow } from '../Styled'

const Field = ({
  values,
  disabled,
  noFilter,
  handleChange,
  rm,
  filterText,
  name,
  focus,
  placeholder,
  minWidth,
  innerRef,
}) => {
  console.log(values)
  return (
    <FieldContainer onClick={focus} disabled={disabled}>
      <TextContainer>
        {values.map(item => (
          <div key={item.value}>
            <CustomTag item={item} rm={() => rm(item.value)} />
          </div>
        ))}
        <Input
          noFilter={noFilter}
          handleChange={handleChange}
          filterText={filterText}
          name={name}
          focus={focus}
          placeholder={placeholder}
          minWidth={minWidth}
          innerRef={innerRef}
        />
      </TextContainer>
      <Arrow />
    </FieldContainer>
  )
}

export default Field
