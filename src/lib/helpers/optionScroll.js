let scroll = 0

const onOptionScroll = (e, reachedBottom, reachedTop) => {
  const { scrollTop, scrollHeight, clientHeight, childNodes } = e.target
  const down = scroll < scrollTop && 'down'
  const up = scroll > scrollTop && 'up'
  const delta = childNodes[0].clientHeight
  const limitTop = 0 + delta < scrollTop
  const limitBottom = scrollHeight - clientHeight - delta < scrollTop

  if (up && limitTop && reachedTop) reachedTop()
  if (down && limitBottom && reachedBottom) reachedBottom()

  scroll = scrollTop
}

export default onOptionScroll
