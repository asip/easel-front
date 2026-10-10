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

  let tagify: Tagify | null = null

  const { $tagify } = useNuxtApp()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tagifyClass = $tagify as any

  let controller: AbortController

  const tags = customRef<Tagify.TagData[] | undefined, string[] | undefined>(() => {
    return {
      get() {
        return tagify?.value
      },
      set(value: string[] | undefined) {
        tagify?.loadOriginalValues(value ?? [])
      },
    }
  })

  const autocomplete = customRef<string[] | Tagify.TagData[], string>(() => {
    return {
      get() {
        return tagify?.whitelist ?? []
      },
      set(value: string) {
        if (tagify) tagify.whitelist = autocompleteTags?.tags.value ?? []
        tagify?.loading(false).dropdown.show(value)
      },
    }
  })

  const init = (): void => {
    if (el.value) {
      tagify = new tagifyClass(el.value, options)

      eventCallbacks()
    }
  }

  const eventCallbacks = (): void => {
    tagify?.on('input', (ev) => onInput(ev))

    tagify?.on('add', () => {
      tagList.value = tags.value?.map((v) => v.value)
    })
    tagify?.on('remove', () => {
      tagList.value = tags.value?.map((v) => v.value)
    })
  }

  const onInput = async (ev: CustomEvent): Promise<void> => {
    const value = ev.detail.value as string
    if (tagify) tagify.whitelist = []

    controller?.abort()
    controller = new AbortController()

    await autocompleteTags?.filterBy(value, { signal: controller.signal })
    autocomplete.value = value
  }

  const close = (): void => {
    if (tagify) {
      tagify.destroy()
      tagify = null
    }
  }

  return { tags, init, close }
}
