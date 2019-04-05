import React from 'react'

import Input from './Input'
import { CustomTag } from '../CustomComponents'

import { FieldContainer, TextContainer, Arrow } from '../Styled'

const Field = ({
  values,
  disabled,
  noFilter,
  handleChange,
  handleRemove,
  filterText,
  name,
  handleFocus,
  placeholder,
  minWidth,
  innerRef,
}) => (
  <FieldContainer onClick={handleFocus} disabled={disabled}>
    <TextContainer>
      {values.map(item => (
        <div key={item.value}>
          <CustomTag
            item={item}
            handleRemove={() => handleRemove(item.value)}
          />
        </div>
      ))}
      <Input
        noFilter={noFilter}
        handleChange={handleChange}
        filterText={filterText}
        name={name}
        handleFocus={handleFocus}
        placeholder={placeholder}
        minWidth={minWidth}
        innerRef={innerRef}
      />
    </TextContainer>
    <Arrow />
  </FieldContainer>
)

export default Field
