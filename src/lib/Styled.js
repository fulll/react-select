import React from 'react'
import styled from 'styled-components'

export const Root = styled.div`
  position: relative;
  width: 100%;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`

export const NoResult = styled.div`
  width: 100%;
  color: black;
  height: 40px;
  padding: 10px;
  box-sizing: border-box;
`

export const Field = styled.div`
  font-family: Open Sans, sans-serif;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid rgb(225, 225, 225);
  -webkit-font-smoothing: antialiased;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`

export const Tag = styled.div`
  background: lightgrey;
  margin: 4px 0 4px 10px;
  box-sizing: border-box;
  vertical-align: middle;
  font-size: 14px;
  border-radius: 2px;
  cursor: default;
  user-select: none;
  padding: 4px 8px;
  &:hover {
    background-color: #e57373;
  }
`

export const TextContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;
`

export const Input = styled.input`
  outline: none;
  background: transparent;
  border: none;
  margin: 9px 0 7px 10px;
  box-sizing: border-box;
  font-size: 16px;
  vertical-align: top;
  flex: 1;
  min-width: ${props => props.minWidth}px;
`

export const OptionsContainer = styled.div`
  position: absolute;
  background: white;
  width: ${props => props.width}px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 2px;
  max-height: ${props => props.maxHeight}px;
  overflow-y: scroll;
  z-index: 1000;
`

export const OptionWrapper = styled.div`
  cursor: pointer
  box-sizing: border-box;
  padding: 10px;
  font-family: Open Sans, sans-serif;
  font-size: 13px;
  user-select: none;
  &:hover {
    background: #fafafa;
  }
`

export const Label = styled.label`
  font-size: 12px;
  font-weight: 400;
  color: ${props => (props.focus ? 'black' : 'rgba(0, 0, 0, 0.26)')};
  transition: color 0.3s;
  font-family: Open sans, sans-serif;
`

export const ArrowContainer = styled.span`
  padding: 5px;
  cursor: pointer;
  user-select: none;
  height: 100%;
`

export const Arrow = props => <ArrowContainer {...props}>▾</ArrowContainer>
