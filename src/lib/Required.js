import React from 'react'

import { RequiredLabel } from './Styled'

const Required = ({ displayOptions }) => (
  <RequiredLabel display={displayOptions ? 1 : 0}>*</RequiredLabel>
)

export default Required
