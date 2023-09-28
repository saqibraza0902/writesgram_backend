export const countWords = (text: string) => {
  if (!text) {
    return 0
  }
  const words = text.split(/\s+/).filter(word => word.length > 0)
  return words.length
}
