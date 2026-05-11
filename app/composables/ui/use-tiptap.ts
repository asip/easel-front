export const useTiptap = function () {
  const p2br = (content: string): string => {
    content = content.replace(/<\/p><p>/gi, '<br>')
    content = content.replace(/<p>/gi, '')
    content = content.replace(/<\/p>/gi, '')
    return content
  }

  const p2empty = (content: string | undefined | null): string => {
    if (!content || content == '<p></p>') content = ''
    return content
  }

  const empty2p = (content: string | undefined): string => {
    if (!content || content == '') content = '<p></p>'
    return content
  }

  return { p2br, p2empty, empty2p }
}
