function splitQueryText (text: string, query: string): string[] {
  if (!query) {
    return [text]
  }
  const regex = new RegExp(`(\\${query})`, 'i')

  return text.split(regex)
}

export default splitQueryText
