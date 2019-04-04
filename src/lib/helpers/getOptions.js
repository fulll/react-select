import escaperegexp from 'lodash.escaperegexp'

const getOptions = (values, filterText, options) => {
  const regex = new RegExp(escaperegexp(filterText), 'i')
  let filteredOptions = options.filter(
    item => item.label.match(regex) || item.disabled,
  )
  let sectionToRemove = []
  const sections = filteredOptions.filter(v => v.section)
  sections.forEach(section => {
    if (
      !filteredOptions.filter(v => {
        const sameId = v.sectionId === section.sectionId
        const notSection = !v.section
        return sameId && notSection
      })[0]
    ) {
      sectionToRemove = [...sectionToRemove, section.sectionId]
    }
  })
  if (sectionToRemove.length !== 0) {
    filteredOptions = filteredOptions.filter(v => {
      if (v.section && sectionToRemove.indexOf(v.sectionId) !== -1) {
        return false
      }
      return true
    })
  }

  const cValues = values.map(e => e.value)
  return filteredOptions.filter(e => cValues.indexOf(e.value) === -1)
}

export default getOptions
