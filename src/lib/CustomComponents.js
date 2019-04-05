import React from 'react'
import { Tag, OptionWrapper, NoResult } from './Styled'

export const CustomOption = ({ item }) => (
  <OptionWrapper>{item.label}</OptionWrapper>
)
export const CustomTag = ({ item, handleRemove }) => (
  <Tag onClick={handleRemove}>{item.label}</Tag>
)

export const CustomNoResult = () => <NoResult>No result found</NoResult>
