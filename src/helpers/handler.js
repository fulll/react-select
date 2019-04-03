export const handleText = ({ target: { value } }, textChange) => {
  textChange(value)
  return { filterText: value, selected: 0 }
}

export const handleSize = element => {
  if (element) return element.offsetWidth
}
