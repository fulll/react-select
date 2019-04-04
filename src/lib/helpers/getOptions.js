import escaperegexp from 'lodash.escaperegexp'

const getOptions = (values, filterText, options) => {
  const regex = new RegExp(escaperegexp(filterText), 'i')
  const searchedOptions = options.filter(({ label }) => label.match(regex))

  const filteredOptions = searchedOptions.filter(
    item => !values.filter(v => v.value === item.value).length,
  )
  return filteredOptions
}

export default getOptions
