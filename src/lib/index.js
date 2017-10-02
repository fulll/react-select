/* eslint-disable react/no-multi-comp, jsx-a11y/no-static-element-interactions, no-console, react/no-unused-prop-types */
import React from 'react'
import PropTypes from 'prop-types'

import { isEqual, debounce, uniq } from './helpers'

import {
  Root,
  SelectBox,
  Tag,
  Text,
  Arrow,
  OptionWrapper,
  Options,
  Label,
  TextContainer,
  NoResult
} from './Styled'

const CustomOption = ({ item }: { item: {} }) => (
  <OptionWrapper>{item.label}</OptionWrapper>
)

const CustomTag = ({ item, rm }: { item: {}, rm: Function }) => (
  <Tag onClick={rm}>{item.label}</Tag>
)

const CustomNoResult = () => <NoResult>No result found</NoResult>

const random = () =>
  Math.random()
    .toString()
    .slice(-4)

class Option extends React.Component {
  componentWillReceiveProps = nextProps => {
    if (nextProps.selected) {
      const parent = this.option.parentNode
      const h = this.option.offsetHeight
      const pos = this.option.offsetTop + h
      const next = pos > 200 ? pos - 200 : 0
      parent.scrollTop = next
    }
  }

  render = () => {
    const { selected, children, onClick } = this.props
    return (
      <div
        ref={option => {
          this.option = option
        }}
        onClick={onClick}
        style={{
          backgroundColor: selected ? '#FAFAFA' : 'white',
          fontWeight: selected ? 'bold' : 'normal'
        }}
      >
        {children}
      </div>
    )
  }
}

Option.defaultProps = {
  onClick: undefined
}

Option.propTypes = {
  selected: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
}

export default class Select extends React.Component {
  state = {
    displayOptions: false,
    filterText: '',
    values: this.props.values,
    selected: 0
  }

  componentWillMount = () => {
    this.debouncedHandleSize = debounce(this.handleSize, 300)
    document.addEventListener('mousedown', this.blur)
    window.addEventListener('resize', this.debouncedHandleSize)
  }

  componentDidMount = () => {
    this.handleSize()
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
    const { customValidator } = this.props
    if (customValidator && this.input) {
      const value = customValidator()
        .then(() => {
          this.input.setCustomValidity('')
        })
        .catch(e => {
          this.input.setCustomValidity(e)
        })
    } else this.input.setCustomValidity('')

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
    this.clear()
  }

  onOptionScroll = e => {
    const scrollTop = this.options.scrollTop
    const scrollHeight = this.options.scrollHeight
    const height = this.options.offsetHeight
    const deltaY = e.deltaY
    const scrollDown = deltaY > 0

    if (scrollDown && deltaY > scrollHeight - height - scrollTop) {
      if (this.props.preventParentScroll) {
        if (this.props.reachedBottom) {
          const sameH = this.options.offsetHeight === this.options.scrollHeight
          if (!this.reachedBottom && !sameH) {
            this.reachedBottom = true
            this.props.reachedBottom()
          }
        }
        this.options.scrollTop = scrollHeight - height
        e.preventDefault()
        e.stopPropagation()
      }
    } else if (!scrollDown && -deltaY > scrollTop) {
      if (this.props.reachedTop) {
        const sameH = this.options.offsetHeight === this.options.scrollHeight
        if (!this.reachedTop && !sameH) {
          this.reachedTop = true
          this.props.reachedTop()
        }
      }
      if (this.props.preventParentScroll) {
        this.options.scrollTop = 0
        e.preventDefault()
        e.stopPropagation()
      }
    } else if (
      this.options.scrollTop !== 0 &&
      this.options.scrollTop !== scrollHeight - height
    ) {
      this.reachedTop = false
      this.reachedBottom = false
    }
  }

  getOptions = () => {
    const { filterText, values } = this.state
    const { options } = this.props
    const regex = new RegExp(filterText, 'i')
    let filteredOptions = options.filter(
      item => item.label.match(regex) || item.disabled
    )
    let sectionToRemove = []
    const sections = filteredOptions.filter(v => v.section)
    sections.forEach(section => {
      if (
        !filteredOptions.filter(v => {
          const sameId = v.sectionId === section.sectionId
          const notSection = !v.section
          return sameId && notSection
        })[0]
      ) {
        sectionToRemove = [...sectionToRemove, section.sectionId]
      }
    })
    if (sectionToRemove.length !== 0) {
      filteredOptions = filteredOptions.filter(v => {
        if (v.section && sectionToRemove.indexOf(v.sectionId) !== -1) {
          return false
        }
        return true
      })
    }

    const cValues = values.map(e => e.value)
    return filteredOptions.filter(e => cValues.indexOf(e.value) === -1)
  }

  getNextIndex = (index, minus) => {
    const options = this.getOptions()
    if (minus) {
      let nextIndex = index - 2
      const item = options[nextIndex]
      if (!item.disabled) nextIndex += 1
      return nextIndex
    }
    let nextIndex = index + 1
    const item = options[index]
    if (item.disabled) nextIndex += 1
    return nextIndex
  }

  handleSize = () => {
    if (this.body) this.setState({ width: this.body.offsetWidth })
  }

  clear = () => {
    this.setState({ selected: 0, filterText: '' })
  }

  handleKey = e => {
    const { selected } = this.state
    const OptionsWithoutValues = this.getOptions()
    const { onEnter } = this.props

    const l = OptionsWithoutValues.length
    const s = selected
    if (e.keyCode === 40) {
      this.setState({ selected: s < l ? this.getNextIndex(s, false) : l })
      e.preventDefault()
      e.stopPropagation()
    }
    if (e.keyCode === 38) {
      this.setState({ selected: s > 1 ? this.getNextIndex(s, true) : s })
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

  handleText = ({ target }) => {
    this.props.onTextChange(target.value)
    this.setState({ filterText: target.value, selected: 0 })
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
        { values: uniq([...this.state.values, value]) },
        this.onChange
      )
    } else {
      this.setState({ values: [value] }, this.onChange)
    }
  }

  rm = value => {
    this.setState(
      { values: this.state.values.filter(v => v.value !== value) },
      this.onChange
    )
  }

  blur = e => {
    if (this.body && !this.body.contains(e.target)) {
      this.setState({ displayOptions: false, selected: 0 })
    }
  }

  render = () => {
    const { displayOptions, values, selected, filterText } = this.state
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
      forceCustomNoResult
    } = this.props
    const displayNoResult = filterText !== '' || forceCustomNoResult
    const OptionsWithoutValues = this.getOptions()
    const randomId = random()
    return (
      <Root
        innerRef={body => {
          this.body = body
        }}
        onKeyDown={this.handleKey}
        disabled={this.props.disabled}
        onScroll={e => e.stopPropagation()}
      >
        {label && (
          <Label focus={this.state.displayOptions}>
            {label}
            {customValidator && (
              <span
                style={{
                  color: displayOptions ? 'red' : 'lightgrey',
                  paddingLeft: 5
                }}
              >
                *
              </span>
            )}
          </Label>
        )}
        <SelectBox onClick={this.focus} disabled={this.props.disabled}>
          <TextContainer>
            {values.map(item => (
              <div key={item.value}>
                <CustomTag item={item} rm={() => this.rm(item.value)} />
              </div>
            ))}
            <Text
              disabled={this.props.noFilter}
              innerRef={input => {
                this.input = input
              }}
              onChange={this.handleText}
              value={this.state.filterText}
              name={`select-search-${randomId}`}
              onFocus={this.focus}
              placeholder={placeholder}
              minWidth={this.props.inputMinWidth}
            />
          </TextContainer>
          <Arrow />
        </SelectBox>
        {displayOptions && (
          <Options
            innerRef={options => {
              this.options = options
            }}
            width={this.state.width}
            maxHeight={this.props.maxHeight}
            onWheel={e => this.onOptionScroll(e)}
          >
            {Header &&
              (OptionsWithoutValues.length !== 0 || forceHeader) && <Header />}
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
            {Footer &&
              (OptionsWithoutValues.length !== 0 || forceFooter) && <Footer />}
          </Options>
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
  onFocus: PropTypes.func
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
  onFocus: undefined
}
