import React from 'react'
import { render } from 'react-dom'

import Select from '../lib'

const options = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
]

if (module.hot) {
  module.hot.accept()
  render(<Select options={options} multi />, document.querySelector('react'))
}
