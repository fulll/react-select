import React from 'react'

const Required = ({ displayOptions }) => (
  <span
    style={{
      color: displayOptions ? '#222' : 'lightgrey',
      paddingLeft: 5,
    }}
  >
    *
  </span>
)

export default Required
