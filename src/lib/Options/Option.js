import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { AnOption } from '../Styled'

class Option extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.selected) {
      const parent = this.option.parentNode
      const parentHeight = parent.clientHeight
      const h = this.option.offsetHeight
      const pos = this.option.offsetTop + h

      const next = pos > parentHeight ? pos - parentHeight : 0
      parent.scrollTop = next
    }
  }

  render() {
    const { selected, children, handleClick } = this.props
    return (
      <AnOption
        innerRef={option => {
          this.option = option
        }}
        onClick={handleClick}
        selected={selected}
      >
        {children}
      </AnOption>
    )
  }
}

Option.defaultProps = {
  handleClick: undefined,
}

Option.propTypes = {
  selected: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func,
}

export default Option
