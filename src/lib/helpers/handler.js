export const handleText = ({ target: { value } }, textChange) => {
  textChange(value)
  return { filterText: value, selected: 0 }
}
