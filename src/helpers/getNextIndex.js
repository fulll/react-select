import getOptions from './getOptions'

export default (index, minus, values, filterText, optionsProp) => {
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
