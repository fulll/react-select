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

// es6
// export const uniq = array => [...new Set(array)]

// es5
export const uniq = array =>
  array.reduce((r, v) => {
    const exist = r.map(e => e.value).indexOf(v.value) > -1
    return exist ? r : [...r, v]
  }, [])

export const random = () =>
  Math.random()
    .toString()
    .slice(2)
