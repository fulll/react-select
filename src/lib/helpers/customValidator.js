const customValidator = (customValidator, input) => {
  if (customValidator && input) {
    customValidator()
      .then(() => {
        input.setCustomValidity('')
      })
      .catch(e => {
        input.setCustomValidity(e)
      })
  } else input.setCustomValidity('')
}

export default customValidator
