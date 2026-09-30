import type { AutocompleteTagsType } from '~/components/Tagify.vue'

export type TagifyOptions = Tagify.TagifySettings & {
  autocompleteTags?: AutocompleteTagsType
}

export const useTagify = function (
  el: Ref<HTMLInputElement | HTMLTextAreaElement | null>,
  tagList: Ref<string[] | undefined>,
  options: TagifyOptions,
) {
  const autocompleteTags = options.autocompleteTags
  if (options.autocompleteTags) delete options.autocompleteTags

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

  const init = (): void => {
    if (el.value) {
      tagEditor = new tagify(el.value, options)

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

  const close = (): void => {
    if (tagEditor) {
      tagEditor.destroy()
      tagEditor = null
    }
  }

  return { tags, init, close }
}
