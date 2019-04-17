import React from 'react'
import styled from 'styled-components'

export const Root = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  background-color: #f5f5f5;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  border-radius: 4px 4px 0 0;
  box-sizing: border-box;
  padding: ${props => (props.label ? '5px 5px 0' : '5px')};

  /* padding: 5px 5px 0; */
  margin: 10px 0;

  &:hover {
    background-color: #ececec;
    border-bottom: 1px solid rgba(0, 0, 0, 1);
  }
`

export const NoResult = styled.div`
  width: 100%;
  color: black;
  height: 40px;
  padding: 10px;
  box-sizing: border-box;
  font-family: Open Sans, sans-serif;
  font-size: 15px;
`

export const FieldContainer = styled.div`
  font-family: Open Sans, sans-serif;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  -webkit-font-smoothing: antialiased;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  padding-top: ${props => (props.label ? 18 : 0)}px;
`

export const Tag = styled.div`
  box-sizing: border-box;
  vertical-align: middle;
  font-size: 14px;
  border-radius: 4px;
  cursor: default;
  user-select: none;
  padding: 3px 4px;
  &:hover {
    cursor: pointer;
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
  left: 0;
  top: calc(100% + 2px);
  background: white;
  width: ${props => props.width}px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 2px;
  max-height: ${props => props.maxHeight}px;
  overflow-y: scroll;
  z-index: 1000;
`

export const OptionWrapper = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  padding: 10px;
  font-family: Open Sans, sans-serif;
  font-size: 15px;
  user-select: none;
  &:hover {
    background: #fafafa;
  }
`

export const AnOption = styled.div`
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  background-color: ${({ selected }) => (selected ? '#FAFAFA' : 'white')};
  cursor: pointer;
`

export const RequiredLabel = styled.span`
  color: ${({ display }) => (display ? 'red' : 'lightgrey')};
  padding-left: 5px;
`

export const Label = styled.label`
  position: absolute;
  left: 7px;
  top: ${({ focus, placeholder, value }) =>
    focus || placeholder || value.length > 0 ? '6px' : '24px'};
  font-size: ${({ focus, placeholder, value }) =>
    focus || placeholder || value.length > 0 ? '12px' : '16px'};
  font-weight: 400;
  color: ${({ focus, placeholder, value }) =>
    focus || placeholder || value.length > 0 ? '#222' : 'rgba(0,0,0,.6)'};
  transition-property: font-size, color, top;
  transition-duration: 0.3s;
  font-family: Open sans, sans-serif;
`

export const ArrowContainer = styled.span`
  padding: 5px;
  cursor: pointer;
  user-select: none;
  height: 100%;
`

export const Arrow = props => <ArrowContainer {...props}>▾</ArrowContainer>
