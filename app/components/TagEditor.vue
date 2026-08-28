<script lang="ts">
import type Tagify from '@yaireo/tagify'

export interface TagSearchType {
  searchTag: (name: string, { signal }: { signal: AbortSignal }) => Promise<void>
  tags: Ref<string[] | undefined>
}
</script>

<script lang="ts" setup>
const model = defineModel<string[]>()

const { settings, tagSearch } = defineProps<{
  settings: Tagify.TagifySettings
  // eslint-disable-next-line vue/require-default-prop
  tagSearch?: TagSearchType | undefined
}>()

const tagEditor = useTemplateRef('tagEditorRef')
const { initTagEditor, closeTagEditor } = useTagEditor({
  el: tagEditor,
  settings,
  tagList: model,
  tagSearch,
})

onMounted(() => {
  // console.log(model.value)
  if (model.value) initTagEditor()
})

onUnmounted(() => {
  closeTagEditor()
})
</script>

<template>
  <input ref="tagEditorRef" type="text" value="" class="input h-auto" >
</template>
