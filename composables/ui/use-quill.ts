
export function useQuill () {
  const p2br = (content: string) => {
    content = content.replace(/<\/p><p>/ig, '<br>');
    content = content.replace(/<p>/ig, '');
    content = content.replace(/<\/p>/ig, '');
    content = content.replace(/<strong><span class="ql-cursor">.*?<\/span><\/strong>/ig,'')
    return content
  }

  return { p2br }
}