type useTagEditorOptions = { el: Ref<HTMLInputElement | HTMLTextAreaElement | null> }

export function useTagEditor ({ el }: useTagEditorOptions) {

  let tagEditor: Tagify | null = null

  const { $tagify } = useNuxtApp() as any

  const initTagEditor = (tagList: Ref<string[] | undefined>): void => {
    if (el.value) {
      tagEditor = new $tagify(el.value, {
        maxTags: 5,
        dropdown: {
          classname: 'color-blue',
          enabled: 0,
          maxItems: 30,
          closeOnSelect: false,
          highlightFirst: true
        }
      })

      tagEditor?.removeAllTags()
      if (tagList.value) tagEditor?.addTags(tagList.value)

      const saveTagList = (): void => {
        if (tagList.value && tagEditor) {
          tagList.value = tagEditor.value.map(v => v.value)
        }
      }

      tagEditor?.on('add', () => saveTagList())
      tagEditor?.on('remove', () => saveTagList())
    }
  }

  const closeTagEditor = (): void => {
    if (tagEditor) {
      tagEditor.destroy()
      tagEditor = null
    }
  }

  return { initTagEditor, closeTagEditor }
}
