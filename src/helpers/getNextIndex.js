export const getNextIndex = (
  index,
  minus,
  getOptions,
  values,
  filterText,
  optionsProp,
) => {
  const options = getOptions(values, filterText, optionsProp)
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

export const handleText = ({ target: { value } }, textChange) => {
  return textChange(value)
}
