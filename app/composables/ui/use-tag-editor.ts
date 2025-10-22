import type { Frame } from '~/interfaces'

type useTagEditorOptions = { key: string }

export function useTagEditor ({ key }: useTagEditorOptions) {
  const tagEditorRef = useTemplateRef(key)

  let tagEditor: Tagify | null = null

  const { $tagify } = useNuxtApp() as any

  const initTagEditor = (tags: Ref<string[] | undefined>) => {
    if (tagEditorRef.value) {
      tagEditor = new $tagify(tagEditorRef.value as HTMLInputElement | HTMLTextAreaElement, {
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
      if (tags.value) {
        tagEditor?.addTags(tags.value)
      }

      const saveTagList = () => {
        if (tags.value && tagEditor) {
          tags.value = tagEditor.value.map(v => v.value)
        }
      }

      tagEditor?.on('add', () => saveTagList())
      tagEditor?.on('remove', () => saveTagList())
    }
  }

  const closeTagEditor = () => {
    if (tagEditor) {
      tagEditor.destroy()
      tagEditor = null
    }
  }

  return { initTagEditor, closeTagEditor }
}
