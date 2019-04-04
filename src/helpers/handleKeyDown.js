import getOptions from './getOptions'
import getNextIndex from './getNextIndex'
const stopEvent = e => {
  e.preventDefault()
  e.stopPropagation()
}
export default (
  e,
  selected,
  values,
  filterText,
  options,
  onEnter,
  handleValue,
) => {
  const OptionsWithoutValues = getOptions(values, filterText, options)

  const l = OptionsWithoutValues.length
  const s = selected

  if (e.keyCode === 40) {
    stopEvent(e)
    return {
      selected: s < l ? getNextIndex(s, false, values, filterText, options) : l,
    }
  }
  if (e.keyCode === 38) {
    stopEvent(e)
    return {
      selected: s > 1 ? getNextIndex(s, true, values, filterText, options) : s,
    }
  }
  if (e.keyCode === 8 && filterText === '') {
    return { values: values.slice(0, -1) }
  }
  if (e.keyCode === 13 && selected > 0) {
    const value = OptionsWithoutValues[selected - 1]

    if (onEnter) {
      onEnter(value, () => handleValue(value))
    } else {
      stopEvent(e)
      handleValue(value)
    }
  }
  if (e.keyCode === 9) return { displayOptions: false, selected: 0 }
  if (e.keyCode === 13 && !onEnter) stopEvent(e)
}
