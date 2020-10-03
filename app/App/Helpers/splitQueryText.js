function splitQueryText (text: String, query: string): string[] {
  if (!query) {
    return [text]
  }
  const regex = new RegExp(`(\\${query})`, 'i')

  return text.split(regex)
}

export default splitQueryText
