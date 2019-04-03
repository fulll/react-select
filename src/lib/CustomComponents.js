import React from 'react'
import { Tag, OptionWrapper, NoResult } from './Styled'

export const CustomOption = ({ item }) => (
  <OptionWrapper>{item.label}</OptionWrapper>
)
export const CustomTag = ({ item, rm }) => <Tag onClick={rm}>{item.label}</Tag>

export const CustomNoResult = () => <NoResult>No result found</NoResult>

export const CustomOptionHeader = ({ Header, options, forceHeader }) => {
  return (
    <React.Fragment>
      {Header && (options.length !== 0 || forceHeader) && <Header />}
    </React.Fragment>
  )
}
