
export function useQuill () {
  const p2br = (content: string): string => {
    content = content.replace(/<\/p><p>/ig, '<br>');
    content = content.replace(/<p>/ig, '');
    content = content.replace(/<\/p>/ig, '');
    content = content.replace(/<strong><span class="ql-cursor">.*?<\/span><\/strong>/ig,'')
    return content
  }

  const pbr2empty = (content: string | undefined | null): string => {
    if (!content || content == '<p><br></p>' || content == '<p></p>') content = '';
    return content
  }

  const empty2pbr = (content: string | undefined): string => {
    if (!content || content == '') content = '<p><br></p>'
    return content
  }

  return { p2br, pbr2empty, empty2pbr }
}
