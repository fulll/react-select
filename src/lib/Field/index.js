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
  displayOptions,
  handleArrow
}) => (
    <Fragment>
      <FieldContainer onClick={handleFocus} disabled={disabled} label={label}>
        <TextContainer>
          {values.map(item => (
            <div key={item.value}>
              {CustomTag ? (
                CustomTag({
                  item,
                  handleRemove: () => handleRemove(item.value),
                })
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
            placeholder={values.length < 1 ? placeholder : null}
            minWidth={minWidth}
            innerRef={innerRef}
          />
        </TextContainer>
      </FieldContainer>
      <Arrow open={displayOptions} onClick={() => handleArrow()}>▾</Arrow>
    </Fragment>
  )

export default Field
