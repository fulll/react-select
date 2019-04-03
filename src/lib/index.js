/* eslint-disable react/no-multi-comp, jsx-a11y/no-static-element-interactions, no-console, react/no-unused-prop-types */
import React from 'react'
import PropTypes from 'prop-types'

import { isEqual, debounce, uniq, random } from '../helpers/helpers'
import { onOptionScroll } from '../helpers/optionScroll'
import { getNextIndex } from '../helpers/getNextIndex'
import { getOptions } from '../helpers/getOptions'
import { handleText } from '../helpers/handler'
import { customValidator } from '../helpers/customValidator'

import {
  Root,
  Field,
  Input,
  Arrow,
  OptionsContainer,
  Label,
  TextContainer,
} from './Styled'

import Option from './Option'
import {
  CustomNoResult,
  CustomOption,
  CustomTag,
  CustomOptionHeader,
} from './CustomComponents'
import Required from './Required'

export default class Select extends React.Component {
  state = {
    displayOptions: false,
    filterText: '',
    values: this.props.values,
    selected: 0,
  }

  componentDidMount = () => {
    this.debouncedHandleSize = debounce(this.handleSize, 300)
    document.addEventListener('mousedown', this.blur)
    window.addEventListener('resize', this.debouncedHandleSize)
  }

  componentWillReceiveProps = nextProps => {
    if (!isEqual(nextProps.values, this.state.values)) {
      this.setState({ values: nextProps.values })
    }
    if (nextProps.filter && !isEqual(nextProps.filter, this.state.filter)) {
      this.setState({ filterText: nextProps.filter })
    }
  }

  componentDidUpdate = () => {
    customValidator(this.props.customValidator, this.input)

    if (this.options && this.props.reachedTop) {
      if (this.options.scrollTop !== 0) this.reachedTop = false
      else this.reachedTop = true
    }

    if (this.options && this.props.reachedBottom) {
      const { scrollTop, scrollHeight, offsetHeight } = this.options
      if (scrollTop !== scrollHeight - offsetHeight) this.reachedBottom = false
      else this.reachedBottom = true
    }
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.blur)
    window.removeEventListener('resize', this.debouncedHandleSize)
  }

  onChange = () => {
    this.props.onChange(this.state.values.map(v => v.value), this.state.values)
    if (this.props.multi) this.focus()
    else if (!this.props.multi && this.state.values[0]) {
      this.input.blur()
      this.setState({ displayOptions: false })
    }
    this.setState({ selected: 0, filterText: '' })
  }

  handleSize = () => {
    if (this.body) this.setState({ width: this.body.offsetWidth })
  }

  handleKey = e => {
    const { selected, values, filterText } = this.state
    const { options } = this.props
    const OptionsWithoutValues = getOptions(values, filterText, options)
    const { onEnter } = this.props

    const l = OptionsWithoutValues.length
    const s = selected
    if (e.keyCode === 40) {
      this.setState({
        selected:
          s < l
            ? getNextIndex(s, false, getOptions, values, filterText, options)
            : l,
      })
      e.preventDefault()
      e.stopPropagation()
    }
    if (e.keyCode === 38) {
      this.setState({
        selected:
          s > 1
            ? getNextIndex(s, true, getOptions, values, filterText, options)
            : s,
      })
      e.preventDefault()
      e.stopPropagation()
    }
    if (e.keyCode === 8 && this.state.filterText === '') {
      this.setState({ values: this.state.values.slice(0, -1) }, this.onChange)
    }
    if (e.keyCode === 13 && this.state.selected > 0) {
      const value = OptionsWithoutValues[this.state.selected - 1]
      if (onEnter) {
        onEnter(value, () => {
          this.handleValue(value)
        })
      } else {
        e.preventDefault()
        e.stopPropagation()
        this.handleValue(value)
      }
    }
    if (e.keyCode === 9) this.setState({ displayOptions: false, selected: 0 })
    if (e.keyCode === 13 && !onEnter) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  focus = () => {
    if (this.props.onFocus) this.props.onFocus()
    this.input.focus()
    this.setState({ displayOptions: true })
    this.handleSize()
  }

  handleValue = value => {
    if (this.props.multi) {
      this.setState(
        { values: uniq([...this.state.values, value]), filterText: '' },
        this.onChange,
      )
    } else {
      this.setState({ values: [value], filterText: '' }, this.onChange)
    }
  }

  rm = value => {
    this.setState(
      { values: this.state.values.filter(v => v.value !== value) },
      this.onChange,
    )
  }

  blur = e => {
    if (this.body && !this.body.contains(e.target)) {
      this.setState({ displayOptions: false, selected: 0 })
    }
  }

  render = () => {
    const { displayOptions, values, selected, filterText, width } = this.state
    const {
      CustomOption,
      CustomTag,
      CustomNoResult,
      label,
      customValidator,
      placeholder,
      Header,
      Footer,
      forceHeader,
      forceFooter,
      forceCustomNoResult,
      options,
      onKeyDown,
      disabled,
      noFilter,
      onTextChange,
      inputMinWidth,
      maxHeight,
    } = this.props
    const displayNoResult = filterText !== '' || forceCustomNoResult
    const OptionsWithoutValues = getOptions(values, filterText, options)
    const randomId = random()

    return (
      <Root
        innerRef={body => {
          this.body = body
        }}
        onKeyDown={e => {
          this.handleKey(e)
          onKeyDown && onKeyDown(e, options[selected])
        }}
        disabled={disabled}
        onScroll={e => e.stopPropagation()}
      >
        {label && (
          <Label focus={displayOptions}>
            {label}
            {customValidator && <Required displayOptions={displayOptions} />}
          </Label>
        )}
        {/* < InputField 
          disabled={disabled}
          focus={this.focus}
          values={values}
          noFilter={noFilter}
          handleChange={e =>
            this.setState({
              filterText: handleText(e, onTextChange).filterText,
              selected: handleText(e, onTextChange).selected,
            })
          }
          filterText={filterText}
          name={`select-search-${randomId}`}
          placeholder={placeholder}
          minWidth={inputMinWidth}
        /> */}
        <Field onClick={this.focus} disabled={disabled}>
          <TextContainer>
            {values.map(item => (
              <div key={item.value}>
                <CustomTag item={item} rm={() => this.rm(item.value)} />
              </div>
            ))}
            <Input
              disabled={noFilter}
              innerRef={input => {
                this.input = input
              }}
              onChange={e =>
                this.setState({
                  filterText: handleText(e, onTextChange).filterText,
                  selected: handleText(e, onTextChange).selected,
                })
              }
              value={filterText}
              name={`select-search-${randomId}`}
              onFocus={this.focus}
              placeholder={placeholder}
              minWidth={inputMinWidth}
            />
          </TextContainer>
          <Arrow />
        </Field>
        {displayOptions && (
          <OptionsContainer
            innerRef={options => {
              this.options = options
            }}
            width={width}
            maxHeight={maxHeight}
            onWheel={e =>
              onOptionScroll(
                e,
                this.options,
                this.props.preventParentScroll,
                this.props.reachedBottom,
                this.reachedBottom,
              )
            }
          >
            <CustomOptionHeader
              options={OptionsWithoutValues}
              forceHeader={forceHeader}
              Header={Header}
            />

            {OptionsWithoutValues.length !== 0
              ? OptionsWithoutValues.map((item, i) => (
                  <Option
                    selected={selected === i + 1}
                    key={item.value}
                    onClick={
                      item.disabled ? undefined : () => this.handleValue(item)
                    }
                  >
                    <CustomOption item={item} />
                  </Option>
                ))
              : displayNoResult && <CustomNoResult />}
            {Footer && (OptionsWithoutValues.length !== 0 || forceFooter) && (
              <Footer />
            )}
          </OptionsContainer>
        )}
      </Root>
    )
  }
}

Select.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func,
  onTextChange: PropTypes.func,
  CustomOption: PropTypes.func,
  CustomNoResult: PropTypes.func,
  CustomTag: PropTypes.func,
  Header: PropTypes.func,
  Footer: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({})),
  noFilter: PropTypes.bool,
  multi: PropTypes.bool,
  values: PropTypes.arrayOf(PropTypes.shape({})),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  customValidator: PropTypes.func,
  disabled: PropTypes.bool,
  maxHeight: PropTypes.number,
  inputMinWidth: PropTypes.number,
  preventParentScroll: PropTypes.bool,
  reachedTop: PropTypes.func,
  reachedBottom: PropTypes.func,
  forceHeader: PropTypes.bool,
  forceFooter: PropTypes.bool,
  forceCustomNoResult: PropTypes.bool,
  onEnter: PropTypes.func,
  onFocus: PropTypes.func,
}

Select.defaultProps = {
  onChange: () => console.warn('Add a onChange props to your Select'),
  onTextChange: () => null,
  CustomOption,
  CustomTag,
  CustomNoResult,
  Header: undefined,
  Footer: undefined,
  options: [],
  placeholder: '',
  noFilter: false,
  multi: false,
  values: [],
  label: null,
  customValidator: undefined,
  disabled: false,
  maxHeight: 220,
  inputMinWidth: 10,
  preventParentScroll: false,
  reachedTop: undefined,
  reachedBottom: undefined,
  filter: undefined,
  forceHeader: false,
  forceFooter: false,
  forceCustomNoResult: false,
  onEnter: undefined,
  onFocus: undefined,
}
