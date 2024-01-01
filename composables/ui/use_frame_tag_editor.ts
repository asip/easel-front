import Tagify from '@yaireo/tagify'
import type { Frame } from '~/interfaces/frame'

export function useFrameTagEditor () {
  const tagEditorRef = ref(null)

  let tagEditor: Tagify | null = null

  const initTagEditor = (frame: Frame) => {
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
      if (frame?.tags) {
        tagEditor.addTags(frame?.tags)
      }

      const saveTagList = () => {
        if (frame && tagEditor) {
          frame.tags = tagEditor.value.map(v => v.value)
          frame.tag_list = frame.tags?.join(',')
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
