import React from 'react'

const Required = ({ displayOptions }) => (
  <span
    style={{
      color: displayOptions ? 'red' : 'lightgrey',
      paddingLeft: 5,
    }}
  >
    *
  </span>
)

export default Required
