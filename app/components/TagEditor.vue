<script lang="ts">
export interface TagSearchType {
  searchTag: (name: string, { signal }: { signal: AbortSignal }) => Promise<void>
  tags: Ref<string[] | undefined>
}
</script>

<script lang="ts" setup>
const model = defineModel<string[]>()

const { tagSearch } = defineProps<{
  // eslint-disable-next-line vue/require-default-prop
  tagSearch?: TagSearchType | undefined
}>()

const tagEditor = useTemplateRef('tagEditorRef')
const { initTagEditor, closeTagEditor } = useTagEditor({
  el: tagEditor,
  tagList: model,
  tagSearch,
})

onMounted(() => {
  // console.log(frame)
  if (import.meta.client && model.value) {
    initTagEditor()
  }
})

onUnmounted(() => {
  if (import.meta.client) closeTagEditor()
})
</script>

<template>
  <input ref="tagEditorRef" type="text" value="" class="input h-auto" >
</template>
