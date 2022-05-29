export const relativeOffsetPosition = (parentElement, childElement) => {
  const parentPos = parentElement.getBoundingClientRect()
  const childPos = childElement.getBoundingClientRect()

  childPos.relative = {}
  childPos.relative.top = childPos.top - parentPos.top
  childPos.relative.right = childPos.right - parentPos.right
  childPos.relative.bottom = childPos.bottom - parentPos.bottom
  childPos.relative.left = childPos.left - parentPos.left

  childPos.window = {}
  childPos.window.height = window.innerHeight
  childPos.window.width = window.innerWidth

  return childPos
}