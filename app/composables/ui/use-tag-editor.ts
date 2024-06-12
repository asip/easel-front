import Tagify from '@yaireo/tagify'
import type { Frame } from '~/interfaces/frame'

export function useTagEditor () {
  const tagEditorRef = ref(null)

  let tagEditor: Tagify | null = null

  const initTagEditor = (model: Frame) => {
    const elmTe: HTMLInputElement | null = tagEditorRef.value

    if (elmTe) {
      tagEditor = new Tagify(elmTe, {
        maxTags: 5,
        dropdown: {
          classname: 'color-blue',
          enabled: 0,
          maxItems: 30,
          closeOnSelect: false,
          highlightFirst: true
        }
      })

      tagEditor.removeAllTags()
      if (model?.tags) {
        tagEditor.addTags(model?.tags)
      }

      const saveTagList = () => {
        if (model && tagEditor) {
          model.tags = tagEditor.value.map(v => v.value)
          model.tag_list = model.tags?.join(',')
        }
      }

      tagEditor.on('add', () => saveTagList())
      tagEditor.on('remove', () => saveTagList())
    }
  }

  const closeTagEditor = () => {
    if (tagEditor) {
      tagEditor.destroy()
      tagEditor = null
    }
  }

  return { tagEditorRef, initTagEditor, closeTagEditor }
}
