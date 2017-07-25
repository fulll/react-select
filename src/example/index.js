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

  onSubmit = e => {
    e.preventDefault()
    alert('Successfully validated 😜');
  }

  customValidator = () => {
    const { values } = this.state
    if (values.length < 1) {
      const message = "1 option required"
      return Promise.reject(message)
    }
    return Promise.resolve()
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
      >
        <Select
          values={this.state.values}
          onChange={this.handleChange}
          options={options}
          multi
          label="Select option"
          customValidator={this.customValidator}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

if (module.hot) {
  module.hot.accept()
  render(<SelectExample />, document.querySelector('react'))
}
