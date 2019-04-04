import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Option extends Component {
  componentWillReceiveProps = nextProps => {
    if (nextProps.selected) {
      const parent = this.option.parentNode
      const parentHeight = parent.clientHeight
      const h = this.option.offsetHeight
      const pos = this.option.offsetTop + h

      const next = pos > parentHeight ? pos - parentHeight : 0
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
          fontWeight: selected ? 'bold' : 'normal',
        }}
      >
        {children}
      </div>
    )
  }
}

Option.defaultProps = {
  onClick: undefined,
}

Option.propTypes = {
  selected: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
}

export default Option
