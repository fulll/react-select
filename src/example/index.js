import React, { Component } from 'react'
import { render } from 'react-dom'

import Select from '../lib'

const options = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
]

class SelectExample extends Component {
  state = {
    values: []
  }
  handleChange = (value, options) => {
    this.setState({ values: options })
  }
  render() {
    return <Select
      values={this.state.values}
      onChange={this.handleChange}
      options={options}
      multi
    />
  }
}

if (module.hot) {
  module.hot.accept()
  render(<SelectExample />, document.querySelector('react'))
}
