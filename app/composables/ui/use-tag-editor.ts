interface TagSearchType {
  searchTag: (name: string, { abort }: { abort: AbortController }) => Promise<void>
  tags: Ref<string[]>
}

type useTagEditorOptions = { el: Ref<HTMLInputElement | HTMLTextAreaElement | null>, tagSearch?: TagSearchType }

export function useTagEditor ({ el, tagSearch }: useTagEditorOptions) {

  let tagEditor: Tagify | null = null

  const { $tagify } = useNuxtApp() as any

  let controller: AbortController

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

      tagEditor?.on('input', (ev) => onInput(ev))

      tagEditor?.on('add', () => saveTagList(tagList))
      tagEditor?.on('remove', () => saveTagList(tagList))
    }
  }

  const onInput = async (ev: CustomEvent): Promise<void> => {
    const value = ev.detail.value as string
    if(tagEditor) tagEditor.whitelist = []

    controller?.abort()
    controller = new AbortController()

    await tagSearch?.searchTag(value, { abort: controller })
    if(tagEditor) tagEditor.whitelist = tagSearch?.tags.value ?? []
    tagEditor?.loading(false).dropdown.show(value)
  }

  const saveTagList = (tagList: Ref<string[] | undefined>): void => {
    if (tagList.value && tagEditor) {
      tagList.value = tagEditor.value.map(v => v.value)
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
