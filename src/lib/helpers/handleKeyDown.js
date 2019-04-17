import getOptions from './getOptions'
import getNextIndex from './getNextIndex'

const stopEvent = e => {
  e.preventDefault()
  e.stopPropagation()
}

const handleKeyDown = (
  e,
  selected,
  values,
  filterText,
  options,
  onEnter,
  handleValue,
) => {
  const OptionsWithoutValues = getOptions(values, filterText, options)

  const length = OptionsWithoutValues.length

  if (e.key === 'ArrowDown') {
    stopEvent(e)
    return {
      selected:
        selected < length
          ? getNextIndex(selected, false, values, filterText, options)
          : length,
    }
  }

  if (e.key === 'ArrowUp') {
    stopEvent(e)
    return {
      selected:
        selected > 1
          ? getNextIndex(selected, true, values, filterText, options)
          : selected,
    }
  }

  if (e.key === 'Backspace' && filterText === '') {
    return { values: values.slice(0, -1) }
  }

  if (e.key === 'Enter' && selected > 0) {
    const value = OptionsWithoutValues[selected - 1]

    if (onEnter) {
      onEnter(value, () => handleValue(value))
    } else {
      stopEvent(e)
      handleValue(value)
    }
  }

  if (e.key === 'Tab') return { displayOptions: false, selected: 0 }
  if (e.key === 'Enter' && !onEnter) stopEvent(e)
}

export default handleKeyDown
