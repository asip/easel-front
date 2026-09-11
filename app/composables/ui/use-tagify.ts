import type { AutocompleteTagsType } from '~/components/TagEditor.vue'

type TagifyOptions = {
  settings: Tagify.TagifySettings
  tagList: Ref<string[] | undefined>
  autocompleteTags?: AutocompleteTagsType
}

export const useTagify = function (
  el: Ref<HTMLInputElement | HTMLTextAreaElement | null>,
  { settings, tagList, autocompleteTags }: TagifyOptions,
) {
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
      tagEditor?.loadOriginalValues(value ?? [])
    },
  })

  const autocomplete = computed<string[] | Tagify.TagData[], string>({
    get() {
      return tagEditor?.whitelist ?? []
    },
    set(value: string) {
      if (tagEditor) tagEditor.whitelist = autocompleteTags?.tags.value ?? []
      tagEditor?.loading(false).dropdown.show(value)
    },
  })

  const initTagify = (): void => {
    if (el.value) {
      tagEditor = new tagify(el.value, settings)

      eventCallbacks()
    }
  }

  const eventCallbacks = (): void => {
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

    await autocompleteTags?.filterBy(value, { signal: controller.signal })
    autocomplete.value = value
  }

  const closeTagify = (): void => {
    if (tagEditor) {
      tagEditor.destroy()
      tagEditor = null
    }
  }

  return { tags, initTagify, closeTagify }
}
