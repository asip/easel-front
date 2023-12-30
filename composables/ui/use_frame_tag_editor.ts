import Tagify from '@yaireo/tagify'
import type { Frame } from '~/interfaces/frame'

export function useFrameTagEditor () {
  const tagEditorRef = ref(null)

  const initTagEditor = (frame: Frame) => {
    const elmTe: HTMLInputElement | null = tagEditorRef.value

    if (elmTe) {
      const tag_editor = new Tagify(elmTe, {
        maxTags: 5,
        dropdown: {
          classname: 'color-blue',
          enabled: 0,
          maxItems: 30,
          closeOnSelect: false,
          highlightFirst: true
        }
      })

      tag_editor.removeAllTags()
      if (frame?.tags) {
        tag_editor.addTags(frame?.tags)
      }

      const saveTagList = () => {
        if (frame) {
          frame.tags = tag_editor.value.map(v => v.value)
          frame.tag_list = frame.tags?.join(',')
        }
      }

      tag_editor.on('add', () => saveTagList())
      tag_editor.on('remove', () => saveTagList())
    }
  }

  return { tagEditorRef, initTagEditor }
}
