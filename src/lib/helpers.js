export const debounce = (f, t = 300) => {
  let timeout = null

  return (...arg) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => f(...arg), t)
  }
}

export const isEqual = (a, b) => {
  try {
    return JSON.stringify(a) === JSON.stringify(b)
  } catch (e) {
    console.warn(e)
    return false
  }
}

export const uniq = array => [...new Set(array)]
