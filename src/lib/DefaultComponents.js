import React from 'react'
import { Tag, OptionWrapper, NoResult } from './Styled'

export const DefaultOption = ({ item }) => (
  <OptionWrapper>{item.label}</OptionWrapper>
)
export const DefaultTag = ({ item, handleRemove }) => (
  <Tag onClick={handleRemove}>{item.label}</Tag>
)

export const DefaultNoResult = () => <NoResult>No result found</NoResult>
