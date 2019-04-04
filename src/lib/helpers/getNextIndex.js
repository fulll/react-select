import getOptions from './getOptions'

const getNextIndex = (index, minus, values, filterText, optionsProp) => {
  const options = getOptions(values, filterText, optionsProp)

  let nextIndex = minus ? index - 1 : index + 1
  const item = options[nextIndex]

  return item && item.disabled ? nextIndex + 1 : nextIndex
}

export default getNextIndex
