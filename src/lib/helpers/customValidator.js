const customValidator = (customValidator, input) => {
  if (customValidator && input) {
    const value = customValidator()
      .then(() => {
        if (input) input.setCustomValidity('')
      })
      .catch(e => {
        if (input) input.setCustomValidity(e)
      })
  } else input.setCustomValidity('')
}

export default customValidator
