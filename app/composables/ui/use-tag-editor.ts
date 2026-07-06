import type { TagSearchType } from '~/components/TagEditor.vue'

type TagEditorOptions = {
  el: Ref<HTMLInputElement | HTMLTextAreaElement | null>
  tagList: Ref<string[] | undefined>
  tagSearch?: TagSearchType
}

export const useTagEditor = function ({ el, tagList, tagSearch }: TagEditorOptions) {
  let tagEditor: Tagify | null = null

  const { $tagify } = useNuxtApp()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tagify = $tagify as any

  let controller: AbortController

  const tags = computed<Tagify.TagData[] | undefined, string[] | undefined>({
    get() {
      return tagEditor?.value
    },
    set(value: string[] | undefined) {
      tagEditor?.removeAllTags()
      if (value) tagEditor?.addTags(value)
    },
  })

  const autocomplete = computed<string[] | Tagify.TagData[], string>({
    get() {
      return tagEditor?.whitelist ?? []
    },
    set(value: string) {
      if (tagEditor) tagEditor.whitelist = tagSearch?.tags.value ?? []
      tagEditor?.loading(false).dropdown.show(value)
    },
  })

  const initTagEditor = (): void => {
    if (el.value) {
      tagEditor = new tagify(el.value, {
        maxTags: 5,
        dropdown: {
          classname: 'color-blue',
          enabled: 0,
          maxItems: 30,
          closeOnSelect: false,
          highlightFirst: true,
        },
      })

      tags.value = tagList.value

      setEventCallbacks()
    }
  }

  const setEventCallbacks = (): void => {
    tagEditor?.on('input', (ev) => onInput(ev))

    tagEditor?.on('add', () => {
      tagList.value = tags.value?.map((v) => v.value)
    })
    tagEditor?.on('remove', () => {
      tagList.value = tags.value?.map((v) => v.value)
    })
  }

  const onInput = async (ev: CustomEvent): Promise<void> => {
    const value = ev.detail.value as string
    if (tagEditor) tagEditor.whitelist = []

    controller?.abort()
    controller = new AbortController()

    await tagSearch?.searchTag(value, { signal: controller.signal })
    autocomplete.value = value
  }

  const closeTagEditor = (): void => {
    if (tagEditor) {
      tagEditor.destroy()
      tagEditor = null
    }
  }

  return { initTagEditor, closeTagEditor }
}
