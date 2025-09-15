import type { Frame } from '~/interfaces'

export function useTagEditor (refKey: string) {
  const tagEditorRef = useTemplateRef(refKey)

  let tagEditor: Tagify | null = null

  const { $tagify } = useNuxtApp() as any

  const initTagEditor = (model: Frame) => {

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
      if (model?.tags) {
        tagEditor?.addTags(model?.tags)
      }

      const saveTagList = () => {
        if (model && tagEditor) {
          model.tags = tagEditor.value.map(v => v.value)
          model.tag_list = model.tags?.join(',')
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
