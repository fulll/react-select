export const onOptionScroll = (
  e,
  ref,
  parentScroll,
  reachedBottom,
  reachedBottomBool,
) => {
  const scrollTop = ref.scrollTop
  const scrollHeight = ref.scrollHeight
  const height = ref.offsetHeight
  const deltaY = e.deltaY
  const scrollDown = deltaY > 0

  if (scrollDown && deltaY > scrollHeight - height - scrollTop) {
    if (parentScroll) {
      if (reachedBottom) {
        const sameH = ref.offsetHeight === ref.scrollHeight
        if (!reachedBottomBool && !sameH) {
          reachedBottomBool = true
          reachedBottom()
        }
      }
      ref.scrollTop = scrollHeight - height
      e.preventDefault()
      e.stopPropagation()
    }
  } else if (!scrollDown && -deltaY > scrollTop) {
    if (this.props.reachedTop) {
      const sameH = ref.offsetHeight === ref.scrollHeight
      if (!this.reachedTop && !sameH) {
        this.reachedTop = true
        this.props.reachedTop()
      }
    }
    if (parentScroll) {
      ref.scrollTop = 0
      e.preventDefault()
      e.stopPropagation()
    }
  } else if (ref.scrollTop !== 0 && ref.scrollTop !== scrollHeight - height) {
    this.reachedTop = false
    reachedBottomBool = false
  }
}
