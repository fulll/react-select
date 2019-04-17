import React, { Fragment } from 'react'

import Input from './Input'
import { DefaultTag } from '../DefaultComponents'

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
  CustomTag,
  label,
}) => (
  <Fragment>
    <FieldContainer onClick={handleFocus} disabled={disabled} isLabel={label}>
      <TextContainer>
        {values.map(item => (
          <div key={item.value}>
            {CustomTag ? (
              CustomTag({ item, handleRemove })
            ) : (
              <DefaultTag
                item={item}
                handleRemove={() => handleRemove(item.value)}
              />
            )}
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
    </FieldContainer>
    <Arrow />
  </Fragment>
)

export default Field
