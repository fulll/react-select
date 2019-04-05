let scroll = 0

const onOptionScroll = (reachedBottom, reachedTop) => e => {
  const { scrollTop, scrollHeight, clientHeight, childNodes } = e.target

  const direction = scroll > scrollTop ? 'up' : 'down'
  const delta = childNodes[0].clientHeight
  const limitTop = 0 + delta < scrollTop
  const limitBottom = scrollHeight - clientHeight - delta < scrollTop

  if (direction === 'up' && limitTop && reachedTop) reachedTop()
  if (direction === 'down' && limitBottom && reachedBottom) reachedBottom()

  scroll = scrollTop
}

export default onOptionScroll
