interface TagSearchType {
  searchTag: (name: string, { signal }: { signal: AbortSignal }) => Promise<void>
  tags: Ref<string[]>
}

type TagEditorOptions = {
  el: Ref<HTMLInputElement | HTMLTextAreaElement | null>
  tagList: Ref<string[] | undefined>
  tagSearch?: TagSearchType
}

export function useTagEditor({ el, tagList, tagSearch }: TagEditorOptions) {
  let tagEditor: Tagify | null = null

  const { $tagify } = useNuxtApp() as any

  let controller: AbortController

  const initTagEditor = (): void => {
    if (el.value) {
      tagEditor = new $tagify(el.value, {
        maxTags: 5,
        dropdown: {
          classname: 'color-blue',
          enabled: 0,
          maxItems: 30,
          closeOnSelect: false,
          highlightFirst: true,
        },
      })

      initTags()
      setEventCallbacks()
    }
  }

  const initTags = (): void => {
    tagEditor?.removeAllTags()
    if (tagList.value) tagEditor?.addTags(tagList.value)
  }

  const setEventCallbacks = (): void => {
    tagEditor?.on('input', (ev) => onInput(ev))

    tagEditor?.on('add', () => saveTagList())
    tagEditor?.on('remove', () => saveTagList())
  }

  const onInput = async (ev: CustomEvent): Promise<void> => {
    const value = ev.detail.value as string
    if (tagEditor) tagEditor.whitelist = []

    controller?.abort()
    controller = new AbortController()

    await tagSearch?.searchTag(value, { signal: controller.signal })
    setAutocomplete(value)
  }

  const setAutocomplete = (value: string): void => {
    if (tagEditor) tagEditor.whitelist = tagSearch?.tags.value ?? []
    tagEditor?.loading(false).dropdown.show(value)
  }

  const saveTagList = (): void => {
    if (tagList.value && tagEditor) {
      tagList.value = tagEditor.value.map((v) => v.value)
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
